import { Request, Response } from "express";
import { injectable, inject } from "tsyringe";
import { user_services } from "../services/user.services";

@injectable()
export class user_controllers {
  //? inject ?//
  constructor(@inject("user_services") private userServices: user_services) {}
  //? inject ?//
  async register(req: Request, res: Response): Promise<Response> {
    const response = await this.userServices.register(req.body);

    return res.status(201).json(response);
  }

  async login(req: Request, res: Response): Promise<Response> {
    const response = await this.userServices.login(req.body);

    return res.status(200).json(response);
  }

  getUser(req: Request, res: Response) {
    const id = res.locals.decode.id;

    const response = this.userServices.getUser(id);

    return res.status(200).json(response);
  }
}
