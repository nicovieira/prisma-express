"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app_error = void 0;
class app_error extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
    }
}
exports.app_error = app_error;
