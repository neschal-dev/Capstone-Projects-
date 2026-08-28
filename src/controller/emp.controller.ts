import { type Request, type Response } from "express";
import { DB } from "../model/emp.model.js";

export function getEmployees(req: Request, res: Response) {
  const { department } = req.query;
  try {
    if (department) {
      const filteredEmp = DB.filter((e) => e.Department == department);

      res.status(200).send({ success: true, data: filteredEmp });
      return;
    }
    res.status(200).send({ success: true, data: DB });
  } catch (error) {
    console.log(error);
  }
}
