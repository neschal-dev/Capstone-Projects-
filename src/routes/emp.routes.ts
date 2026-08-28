import express, { type Express } from "express";
import { getEmployees } from "../controller/emp.controller.js";

const app: Express = express();

app.get("/search", getEmployees);

export default app;
