import { type Request, type Response } from "express";
import { loginUser, registerUser } from "../services/auth.services.js";

interface RegisterBody {
  username: string;
  email: string;
  password: string;
}
export async function register(req: Request, res: Response) {
  const { username, email, password } = req.body as RegisterBody;

  const user = await registerUser(username, email, password);

  res.status(201).json({
    success: true,
    data: user,
  });
}
interface LoginBody {
  email: string;
  password: string;
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body as LoginBody;

  const accessToken = await loginUser(email, password);

  res.status(200).json({
    success: true,
    data: { accessToken },
  });
}
