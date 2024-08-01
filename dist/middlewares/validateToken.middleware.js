"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate_token = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const appError_1 = require("../errors/appError");
class validate_token {
    static execute(req, res, next) {
        const authorization = req.headers.authorization;
        const token = authorization === null || authorization === void 0 ? void 0 : authorization.replace("Bearer ", "");
        if (!token) {
            throw new appError_1.app_error(403, "Token is required");
        }
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        res.locals.decode = jsonwebtoken_1.default.decode(token);
        next();
    }
}
exports.validate_token = validate_token;
