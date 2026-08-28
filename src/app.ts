import express, {
  urlencoded,
  type Express,
  type Request,
  type Response,
} from "express";
import getEmployees from "./routes/emp.routes.js";

import { globalErrorHandler } from "./middleware/error.middleware.js";
import { notFoundHandler } from "./middleware/not-found.middleware.js";

const app: Express = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use("/api/v1/", getEmployees);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from Express + TypeScript!");
});
app.use(notFoundHandler);
app.use(globalErrorHandler);

export default app;
