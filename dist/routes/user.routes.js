"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const tsyringe_1 = require("tsyringe");
const user_services_1 = require("../services/user.services");
const user_controllers_1 = require("../controllers/user.controllers");
const validateBody_middleware_1 = require("../middlewares/validateBody.middleware");
const validateToken_middleware_1 = require("../middlewares/validateToken.middleware");
const isEmailUnique_middleware_1 = require("../middlewares/isEmailUnique.middleware");
const user_schemas_1 = require("../schemas/user.schemas");
tsyringe_1.container.registerSingleton("UserServices", user_services_1.user_services);
const userControllers = tsyringe_1.container.resolve(user_controllers_1.user_controllers);
exports.userRouter = (0, express_1.Router)();
exports.userRouter.post("/", isEmailUnique_middleware_1.is_email_unique.execute, validateBody_middleware_1.validate_body.execute(user_schemas_1.userRegisterBodySchema), (req, res) => {
    userControllers.register(req, res);
});
exports.userRouter.post("/login", validateBody_middleware_1.validate_body.execute(user_schemas_1.userLoginBodySchema), (req, res) => {
    userControllers.login(req, res);
});
exports.userRouter.get("/", validateToken_middleware_1.validate_token.execute, (req, res) => userControllers.getUser(req, res));
