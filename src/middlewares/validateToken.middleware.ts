import jwt from "jsonwebtoken";
import { app_error } from "../errors/appError";
import { NextFunction, Request, Response } from "express";

export class validate_token {
  static execute(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers.authorization;

    const token = authorization?.replace("Bearer ", "");

    if (!token) {
      throw new app_error(403, "Token is required");
    }

    jwt.verify(token, process.env.JWT_SECRET as string);

    res.locals.decode = jwt.decode(token);

    next();
  }
}
