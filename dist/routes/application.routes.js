"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applicationRouter = void 0;
const express_1 = require("express");
const tsyringe_1 = require("tsyringe");
const validateBody_middleware_1 = require("../middlewares/validateBody.middleware");
const application_services_1 = require("../services/application.services");
const application_schemas_1 = require("../schemas/application.schemas");
const validateToken_middleware_1 = require("../middlewares/validateToken.middleware");
const application_controller_1 = require("../controllers/application.controller");
exports.applicationRouter = (0, express_1.Router)();
tsyringe_1.container.registerSingleton("ApplicationServices", application_services_1.application_services);
const applicationControllers = tsyringe_1.container.resolve(application_controller_1.application_controllers);
exports.applicationRouter.post("/:id/applications", validateBody_middleware_1.validate_body.execute(application_schemas_1.applicationCreateSchema), (req, res) => applicationControllers.create(req, res));
exports.applicationRouter.get("/:id/applications", validateToken_middleware_1.validate_token.execute, (req, res) => applicationControllers.findMany(req, res));
