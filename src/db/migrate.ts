import { readdirSync, readFileSync } from "fs";
import pool from "../config/db.js";
import path, { join } from "path";
import logger from "../utils/logger.js";

// Directory where all .sql migration files live.
// Files are expected to be named with a numeric prefix (001_, 002_, ...)
// so that sorting them alphabetically also sorts them in execution order.
const MIGRATIONS_DIR = join(import.meta.dirname, "..", "migration");

// Creates the "migrations" tracking table if it doesn't already exist.
// This table records which migration files have already been applied,
// so re-running this script won't re-apply migrations that already ran.
async function ensureMigrationsTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS migrations (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL UNIQUE,
      applied_at TIMESTAMP NOT NULL DEFAULT NOW()
    );
  `);
}

// Fetches the names of all migration files that have already been applied,
// returned as a Set for fast lookup (O(1) "has this run?" checks).
async function getAppliedMigrations(): Promise<Set<string>> {
  const result = await pool.query<{ name: string }>(
    "SELECT name FROM migrations",
  );
  return new Set(result.rows.map((row) => row.name));
}

// Main migration runner:
// 1. Ensures the tracking table exists.
// 2. Loads the list of already-applied migrations.
// 3. Reads all .sql files from MIGRATIONS_DIR, sorted by filename.
// 4. Skips any file that's already been applied.
// 5. For new files: runs the SQL and records it in the migrations table,
//    all inside a single transaction so a failure doesn't leave the
//    schema partially updated.
async function runMigrations() {
  await ensureMigrationsTable();
  const applied = await getAppliedMigrations();

  const files = readdirSync(MIGRATIONS_DIR)
    .filter((file) => file.endsWith(".sql"))
    .sort(); // relies on filename prefixes like 001_, 002_ for order

  for (const file of files) {
    // Skip migrations that have already been applied in a previous run.
    if (applied.has(file)) {
      console.log(`Skipping already-applied migration: ${file}`);
      continue;
    }

    const sql = readFileSync(join(MIGRATIONS_DIR, file), "utf-8");

    // Grab a dedicated client from the pool so BEGIN/COMMIT/ROLLBACK
    // apply to the same connection for the whole transaction.
    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      // Run the migration's SQL itself.
      await client.query(sql);

      // Record that this migration has now been applied.
      await client.query("INSERT INTO migrations (name) VALUES ($1)", [file]);

      await client.query("COMMIT");
      logger.info(`Applied migration: ${file}`);
    } catch (error) {
      // If anything fails, roll back so the DB isn't left in a
      // half-migrated state, then re-throw to stop the whole run.
      await client.query("ROLLBACK");
      console.error(`Failed to apply migration: ${file}`, error);
      throw error;
    } finally {
      // Always release the client back to the pool, success or failure.
      client.release();
    }
  }

  // Close all pool connections once every migration has been processed.
  await pool.end();
  console.log("All migrations complete.");
}

// Entry point: run migrations, and if the whole process throws,
// log the error and exit with a non-zero code (signals failure to CI/shell).
runMigrations().catch((error) => {
  console.error("Migration run failed:", error);
  process.exit(1);
});
