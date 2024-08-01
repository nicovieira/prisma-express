"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handle_errors = void 0;
const zod_1 = require("zod");
const appError_1 = require("../errors/appError");
const jsonwebtoken_1 = require("jsonwebtoken");
class handle_errors {
    static execute(error, req, res, next) {
        if (error instanceof appError_1.app_error) {
            return res.status(error.statusCode).json({ message: error.message });
        }
        if (error instanceof jsonwebtoken_1.JsonWebTokenError) {
            return res.status(403).json({ message: error.message });
        }
        if (error instanceof zod_1.ZodError) {
            return res.status(422).json(error);
        }
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
exports.handle_errors = handle_errors;
