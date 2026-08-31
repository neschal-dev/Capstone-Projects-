import { env } from "./env.js";
import { Pool } from "pg";

// Shared connection pool for Postgres, reused across the app
// instead of opening a new connection for every query.
const pool = new Pool({
  connectionString: env.DB_URI,
});

// Fired each time a new client connection is established in the pool.
pool.on("connect", () => {
  console.log("Connected to Postgres");
});

// Fired on unexpected errors from idle clients in the pool
// (e.g. the DB connection drops). Since the pool can't safely
// recover from this on its own, we exit the process so it can
// be restarted (e.g. by a process manager) with a fresh pool.
pool.on("error", (err: Error) => {
  console.error("Unexpected Postgres error", err);
  process.exit(-1);
});

// Exported so other modules (like the migration runner) can
// run queries and transactions against the same shared pool.
export default pool;
