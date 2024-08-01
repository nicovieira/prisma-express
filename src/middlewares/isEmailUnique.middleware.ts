import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/prisma";
import { app_error } from "../errors/appError";

export class is_email_unique {
  static async execute(req: Request, res: Response, next: NextFunction) {
    const user = await prisma.user.findFirst({ where: { email: req.body.email } });

    if (user) {
      throw new app_error(403, "Email already registered");
    }

    next();
  }
}
