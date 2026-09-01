import {
  findUserByEmail,
  findUserByUsername,
  createUser,
} from "../repository/user.repository.js";
import { AppError } from "../utils/appError.js";
import { type User } from "../types/users.types.js";
import { validatePassword } from "../utils/validatePasswordRules.js";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const USERNAME_REGEX = /^[a-zA-Z0-9_.]{3,30}$/;

export async function registerUser(
  username: string,
  email: string,
  password: string,
): Promise<User> {
  if (!username || !email || !password) {
    throw AppError.badRequest("Missing required fields.");
  }

  const normalizedEmail = email.trim().toLowerCase();
  const normalizedUsername = username.trim();

  if (!EMAIL_REGEX.test(normalizedEmail)) {
    throw AppError.badRequest("Invalid email format.");
  }
  if (!USERNAME_REGEX.test(normalizedUsername)) {
    throw AppError.badRequest(
      "Username must be 3-30 characters (letters, numbers, underscore, dot).",
    );
  }
  validatePassword(password);

  const [existingByEmail, existingByUsername] = await Promise.all([
    findUserByEmail(normalizedEmail),
    findUserByUsername(normalizedUsername),
  ]);

  if (existingByEmail) {
    throw AppError.conflict("A user already exists with this email.");
  }
  if (existingByUsername) {
    throw AppError.conflict("This username is already taken.");
  }

  return createUser(normalizedUsername, normalizedEmail, password);
}
