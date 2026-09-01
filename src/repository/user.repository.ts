import pool from "../config/db.js";
import { type DBUser, type User } from "../types/users.types.js";
import bcrypt from "bcrypt";

export async function findUserByEmail(email: string): Promise<DBUser | null> {
  const { rows } = await pool.query<DBUser>(
    "SELECT * FROM users WHERE email = $1",
    [email],
  );
  return rows[0] ?? null;
}

export async function findUserByUsername(
  username: string,
): Promise<DBUser | null> {
  const { rows } = await pool.query<DBUser>(
    "SELECT * FROM users WHERE username = $1",
    [username],
  );
  return rows[0] ?? null;
}

export async function createUser(
  username: string,
  email: string,
  password: string,
): Promise<User> {
  const hashedPassword = await bcrypt.hash(password, 10);

  const { rows } = await pool.query<User>(
    `INSERT INTO users (username, email, hashed_password)
     VALUES ($1, $2, $3)
     RETURNING id, username, email, role, created_at`,
    [username, email, hashedPassword],
  );

  const user = rows[0];
  if (!user) {
    throw new Error("Failed to create user");
  }
  return user;
}
