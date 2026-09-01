import { AppError } from "./appError.js";

// 
const PASSWORD_RULES: { regex: RegExp; message: string }[] = [
  { regex: /.{8,}/, message: "Password must be at least 8 characters long." },
  { regex: /[a-z]/, message: "Password must contain a lowercase letter." },
  { regex: /[A-Z]/, message: "Password must contain an uppercase letter." },
  { regex: /[0-9]/, message: "Password must contain a number." },
  { regex: /[^a-zA-Z0-9]/, message: "Password must contain a symbol." },
];

export function validatePassword(password: string): void {
  for (const rule of PASSWORD_RULES) {
    if (!rule.regex.test(password)) {
      throw AppError.badRequest(rule.message);
    }
  }
}
