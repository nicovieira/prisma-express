import { Router } from "express";
import { ApplicationControllers } from "../controllers/application.services";

export const applicationRouter = Router();

const applicationControllers = new ApplicationControllers();

applicationRouter.post("/", applicationControllers.create);
applicationRouter.get("/", applicationControllers.findMany);
