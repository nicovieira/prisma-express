import { Router } from "express";
import { container } from "tsyringe";
import { user_services } from "../services/user.services";
import { user_controllers } from "../controllers/user.controllers";
import { validate_body } from "../middlewares/validateBody.middleware";
import { validate_token } from "../middlewares/validateToken.middleware";
import { is_email_unique } from "../middlewares/isEmailUnique.middleware";
import { userLoginBodySchema, userRegisterBodySchema } from "../schemas/user.schemas";

container.registerSingleton("UserServices", user_services);

const userControllers = container.resolve(user_controllers);

export const userRouter = Router();

userRouter.post(
  "/",
  is_email_unique.execute,
  validate_body.execute(userRegisterBodySchema),
  (req, res) => {
    userControllers.register(req, res);
  }
);

userRouter.post("/login", validate_body.execute(userLoginBodySchema), (req, res) => {
  userControllers.login(req, res);
});

userRouter.get("/", validate_token.execute, (req, res) => userControllers.getUser(req, res));
