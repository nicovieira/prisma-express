import { prisma } from "../database/prisma";
import { injectable } from "tsyringe";
import {
  tOpportunity,
  tOpportunityCreate,
  tOpportunityUpdate,
} from "../schemas/opportunity.schemas";

@injectable()
export class opportunity_services {
  async create(body: tOpportunityCreate, userId: number): Promise<tOpportunity> {
    const newOpportunity = { ...body, userId };

    const data = await prisma.opportunity.create({ data: newOpportunity });

    return data;
  }

  async findMany(userId?: number): Promise<tOpportunity[]> {
    const data = await prisma.opportunity.findMany({ where: { userId: userId } });

    return data;
  }

  findOne(opportunity: tOpportunity): tOpportunity {
    return opportunity;
  }

  async update(id: number, body: tOpportunityUpdate): Promise<tOpportunity> {
    const data = await prisma.opportunity.update({ where: { id }, data: body });

    return data;
  }

  async delete(id: number): Promise<void> {
    await prisma.opportunity.delete({ where: { id } });
  }
}
