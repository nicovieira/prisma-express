import { injectable } from "tsyringe";
import { prisma } from "../database/prisma";
import { tApplication, tApplicationCreate } from "../schemas/application.schemas";

@injectable()
export class application_services {
  async create(opportunityId: number, body: tApplicationCreate): Promise<tApplication> {
    const data = await prisma.application.create({ data: { opportunityId, ...body } });

    return data;
  }

  async findMany(opportunityId: number): Promise<tApplication[]> {
    const data = await prisma.application.findMany({ where: { opportunityId } });

    return data;
  }
}
