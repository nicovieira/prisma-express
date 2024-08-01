"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate_body = void 0;
class validate_body {
    static execute(schema) {
        return (req, res, next) => {
            req.body = schema.parse(req.body);
            return next();
        };
    }
}
exports.validate_body = validate_body;
