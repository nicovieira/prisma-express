import { Request, Response } from "express";
import { application_services } from "../services/application.services";

const applicationServices = new application_services();

export class application_controllers {
  async create(req: Request, res: Response) {
    const response = await applicationServices.create(Number(req.params.id), req.body);

    return res.status(201).json(response);
  }

  async findMany(req: Request, res: Response) {
    const response = await applicationServices.findMany(Number(req.params.id));

    return res.status(200).json(response);
  }
}
