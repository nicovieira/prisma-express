import { injectable } from "tsyringe";
import { TUserLoginBody, TUserRegisterBody } from "../schemas/user.schemas";

@injectable()
export class UserServices{
    register(body: TUserRegisterBody){

    }

    login(body: TUserLoginBody){

    }

    getUser(email: string){

    }
}