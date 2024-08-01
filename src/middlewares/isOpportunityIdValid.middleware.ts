import { prisma } from "../database/prisma";
import { app_error } from "../errors/appError";
import { NextFunction, Request, Response } from "express";

export class is_opportunity_id_valid {
  static async execute(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;

    const opportunity = await prisma.opportunity.findFirst({
      where: { id: Number(id) },
    });

    if (!opportunity) {
      throw new app_error(404, "Opportunity not found");
    }

    res.locals.opportunity = opportunity;

    next();
  }
}
