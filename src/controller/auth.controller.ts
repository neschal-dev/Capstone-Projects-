import { type Request, type Response } from "express";
import { registerUser } from "../services/auth.services.js";

export async function register(req: Request, res: Response) {
  const { email, password } = req.body;
  await registerUser(email, password);
}
export function login(req: Request, res: Response) {}
