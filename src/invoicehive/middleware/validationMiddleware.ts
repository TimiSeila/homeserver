import type { NextFunction, Request, Response } from "express";
import z from "zod";

export const validateData = (schema: z.ZodObject<any, any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const parseResult = schema.safeParse(req.body);

    if (!parseResult.success) {
      res.status(400).json({ error: parseResult.error.issues[0] });
    } else {
      next();
    }
  };
};
