import { prisma } from "../database/prisma";
import { app_error } from "../errors/appError";
import { NextFunction, Request, Response } from "express";

export class is_opportunity_owner {
  static async execute(req: Request, res: Response, next: NextFunction) {
    const userId = res.locals.decode.id;

    const opportunityId = req.params.id;

    const opportunity = await prisma.opportunity.findFirst({
      where: { id: Number(opportunityId) },
    });

    if (opportunity?.userId !== userId) {
      throw new app_error(403, "User is not the owner of this opportunity");
    }

    next();
  }
}
