import type { NextFunction, Request, Response } from "express";
import z from "zod";

export const validateData = (schema: z.ZodObject<any, any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (err) {
      res.status(500).send("Internal server error");
    }
  };
};
