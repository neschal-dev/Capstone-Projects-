import pool from "../config/db.js";
import {
  type DBUserWithPasswordRow,
  type DBUser,
  type User,
} from "../types/users.types.js";
import bcrypt from "bcrypt";

export async function findUserByEmail(email: string): Promise<User | null> {
  const { rows } = await pool.query<DBUser>(
    "SELECT * FROM USERS WHERE email = $1",
    [email],
  );

  return rows[0] ?? null;
}

export async function createUser(
  email: string,
  password: string,
): Promise<User> {
  const hashedPassword = await bcrypt.hash(password, 10);

  const { rows } = await pool.query<DBUserWithPasswordRow>(
    `INSERT INTO users (email, hashed_password) VALUES ($1, $2) RETURNING id, email, role, created_at`,
    [email, hashedPassword],
  );

  const user = rows[0];

  if (!user) {
    throw new Error("Failed to create user");
  }

  return user;
}
