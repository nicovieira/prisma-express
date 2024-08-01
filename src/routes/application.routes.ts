import { Router } from "express";
import { container } from "tsyringe";
import { validate_body } from "../middlewares/validateBody.middleware";
import { application_services } from "../services/application.services";
import { applicationCreateSchema } from "../schemas/application.schemas";
import { validate_token } from "../middlewares/validateToken.middleware";
import { application_controllers } from "../controllers/application.controller";

export const applicationRouter = Router();

container.registerSingleton("ApplicationServices", application_services);

const applicationControllers = container.resolve(application_controllers);

applicationRouter.post(
  "/:id/applications",
  validate_body.execute(applicationCreateSchema),
  (req, res) => applicationControllers.create(req, res)
);
applicationRouter.get("/:id/applications", validate_token.execute, (req, res) =>
  applicationControllers.findMany(req, res)
);
