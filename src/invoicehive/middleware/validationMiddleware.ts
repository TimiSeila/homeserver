import { sendError } from "../../utils/helpers.ts";
import type { NextFunction, Request, Response } from "express";
import z from "zod";

export const validateData = (schema: z.ZodObject<any, any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const parseResult = schema.safeParse(req.body);

    if (!parseResult.success) {
      return sendError(res, "Invalid data received", 400);
    } else {
      next();
    }
  };
};
