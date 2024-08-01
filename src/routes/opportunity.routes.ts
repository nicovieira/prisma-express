import { Router } from "express";
import { container } from "tsyringe";
import { applicationRouter } from "./application.routes";
import { validate_body } from "../middlewares/validateBody.middleware";
import { opportunity_services } from "../services/opportunity.services";
import { validate_token } from "../middlewares/validateToken.middleware";
import { opportunity_controllers } from "../controllers/opportunity.controllers";
import { is_opportunity_owner } from "../middlewares/isOpportunityOwner.middleware";
import { is_opportunity_id_valid } from "../middlewares/isOpportunityIdValid.middleware";
import { opportunityCreateSchema, opportunityUpdateSchema } from "../schemas/opportunity.schemas";

container.registerSingleton("OpportunityServices", opportunity_services);

const opportunityControllers = container.resolve(opportunity_controllers);

export const opportunityRouter = Router();

opportunityRouter.post(
  "/",
  validate_token.execute,
  validate_body.execute(opportunityCreateSchema),
  (req, res) => opportunityControllers.create(req, res)
);

opportunityRouter.get("/", (req, res) => opportunityControllers.findMany(req, res));

opportunityRouter.get("/user", validate_token.execute, (req, res) =>
  opportunityControllers.findMany(req, res)
);

opportunityRouter.use("/:id", is_opportunity_id_valid.execute);

opportunityRouter.get("/:id", validate_token.execute, is_opportunity_owner.execute, (req, res) =>
  opportunityControllers.findOne(req, res)
);
opportunityRouter.patch(
  "/:id",
  validate_token.execute,
  is_opportunity_owner.execute,
  validate_body.execute(opportunityUpdateSchema),
  (req, res) => opportunityControllers.update(req, res)
);
opportunityRouter.delete("/:id", validate_token.execute, is_opportunity_owner.execute, (req, res) =>
  opportunityControllers.delete(req, res)
);

opportunityRouter.use("/", validate_token.execute, (req, res) => applicationRouter);
