import { Router } from "express";
import { OpportunityControllers } from "../controllers/opportunity.controllers";
import { applicationRouter } from "./application.routes";
import { ValidateBody } from "../middlewares/validateBody.middleware";
import {
   opportunityCreateSchema,
   opportunityUpdateSchema,
} from "../schemas/opportunity.schemas";
import { IsOpportunityIdValid } from "../middlewares/isOpportunityIdValid.middleware";
import { container } from "tsyringe";
import { ValidateToken } from "../middlewares/validateToken.middleware";
import { OpportunityServices } from "../services/opportunity.services";

container.registerSingleton("OpportunityServices", OpportunityServices);
const opportunityControllers = container.resolve(OpportunityControllers);

export const opportunityRouter = Router();

opportunityRouter.post(
   "/",
   ValidateToken.execute,
   ValidateBody.execute(opportunityCreateSchema),
   (req, res) => opportunityControllers.create(req, res)
);
opportunityRouter.get("/", ValidateToken.execute, (req, res) =>
   opportunityControllers.findMany(req, res)
);

opportunityRouter.use("/:id", IsOpportunityIdValid.execute);
opportunityRouter.get("/:id", ValidateToken.execute, (req, res) =>
   opportunityControllers.findOne(req, res)
);
opportunityRouter.patch(
   "/:id",
   ValidateToken.execute,
   ValidateBody.execute(opportunityUpdateSchema),
   (req, res) => opportunityControllers.update(req, res)
);
opportunityRouter.delete("/:id", ValidateToken.execute, (req, res) =>
   opportunityControllers.delete(req, res)
);

opportunityRouter.use("/", applicationRouter);
