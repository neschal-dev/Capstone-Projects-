import express, { urlencoded, type Express } from "express";

import cors from "cors";

import { globalErrorHandler } from "./middleware/error.middleware.js";
import { notFoundHandler } from "./middleware/not-found.middleware.js";
import apiRouter from "./routes/index.js";
import pool from "./config/db.js";

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use("/api/v1/", apiRouter);

app.use(notFoundHandler);
app.use(globalErrorHandler);

export default app;
