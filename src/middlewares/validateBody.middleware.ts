import { ZodSchema } from "zod";
import { Request, Response } from "express";
import { NextFunction } from "express-serve-static-core";

export class validate_body {
  static execute(schema: ZodSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
      req.body = schema.parse(req.body);

      return next();
    };
  }
}
