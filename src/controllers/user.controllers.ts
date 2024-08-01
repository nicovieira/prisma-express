import { Request, Response } from "express";

import { user_services } from "../services/user.services";

const userServices = new user_services();

export class user_controllers {
  async register(req: Request, res: Response): Promise<Response> {
    const response = await userServices.register(req.body);

    return res.status(201).json(response);
  }

  async login(req: Request, res: Response): Promise<Response> {
    const response = await userServices.login(req.body);

    return res.status(200).json(response);
  }

  getUser(req: Request, res: Response) {
    const id = res.locals.decode.id;

    const response = userServices.getUser(id);

    return res.status(200).json(response);
  }
}
