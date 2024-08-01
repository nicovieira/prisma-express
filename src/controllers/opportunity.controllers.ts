import { injectable } from "tsyringe";
import { Request, Response } from "express";
import { opportunity_services } from "../services/opportunity.services";

const opportunityServices = new opportunity_services();

@injectable()
export class opportunity_controllers {
  async create(req: Request, res: Response) {
    const id = res.locals.decode.id;

    const response = await opportunityServices.create(req.body, id);

    return res.status(201).json(response);
  }

  async findMany(req: Request, res: Response) {
    const id = res.locals.decode?.id;
    const response = await opportunityServices.findMany(id);

    return res.status(200).json(response);
  }

  findOne(req: Request, res: Response) {
    const response = opportunityServices.findOne(res.locals.opportunity);

    return res.status(200).json(response);
  }

  async update(req: Request, res: Response) {
    const response = await opportunityServices.update(Number(req.params.id), req.body);

    return res.status(200).json(response);
  }

  async delete(req: Request, res: Response) {
    await opportunityServices.delete(Number(req.params.id));

    return res.status(204).json();
  }
}
