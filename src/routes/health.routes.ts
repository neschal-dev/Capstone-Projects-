import { Router, type Request, type Response } from "express";

const healthRouter: Router = Router();

healthRouter.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

export default healthRouter;
