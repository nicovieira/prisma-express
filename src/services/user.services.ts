import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { injectable } from "tsyringe";
import { prisma } from "../database/prisma";
import { app_error } from "../errors/appError";
import {
  tUserLoginBody,
  tUserLoginReturn,
  tUserRegisterBody,
  tUserReturn,
  userReturnSchema,
} from "../schemas/user.schemas";

@injectable()
export class user_services {
  async register(body: tUserRegisterBody): Promise<tUserReturn> {
    const hashPassword = await bcrypt.hash(body.password, 10);

    const newUser = {
      ...body,
      password: hashPassword,
    };

    const user = await prisma.user.create({ data: newUser });

    return userReturnSchema.parse(user);
  }

  async login(body: tUserLoginBody): Promise<tUserLoginReturn> {
    const user = await prisma.user.findFirst({ where: { email: body.email } });

    if (!user) {
      throw new app_error(404, "User not registered");
    }

    const compare = await bcrypt.compare(body.password, user.password);

    if (!compare) {
      throw new app_error(403, "Email and password doens't match");
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string);

    return { accessToken: token, user: userReturnSchema.parse(user) };
  }

  async getUser(id: number): Promise<tUserReturn> {
    const user = await prisma.user.findFirst({ where: { id: id } });
    return userReturnSchema.parse(user);
  }
}
