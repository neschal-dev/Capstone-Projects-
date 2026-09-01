import { findUserByEmail } from "../repository/user.repository.js";
import { AppError } from "../utils/appError.js";
import bcrypt from "bcrypt";


export async function registerUser(
  email: string,
  //   username: string,
  password: string,
): Promise<void> {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const normalizedEmail = email.trim().toLowerCase();

  if (!email || !password)
    throw AppError.badRequest("Missing required fields.");

  if (!emailRegex.test(normalizedEmail))
    throw AppError.badRequest("Invalid email format.");

  // Confirm if user already exists in DB
  const existingUser = await findUserByEmail(normalizedEmail);

  if (existingUser)
    throw AppError.conflict("User already exist with this email!");

  if (password.length < 8)
    throw AppError.badRequest("Password must be at least 8 characters long.");

  const passwordHash = await bcrypt.hash(password , 10)
}
