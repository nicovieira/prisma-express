"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.is_opportunity_owner = void 0;
const prisma_1 = require("../database/prisma");
const appError_1 = require("../errors/appError");
class is_opportunity_owner {
    static execute(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = res.locals.decode.id;
            const opportunityId = req.params.id;
            const opportunity = yield prisma_1.prisma.opportunity.findFirst({
                where: { id: Number(opportunityId) },
            });
            if ((opportunity === null || opportunity === void 0 ? void 0 : opportunity.userId) !== userId) {
                throw new appError_1.app_error(403, "User is not the owner of this opportunity");
            }
            next();
        });
    }
}
exports.is_opportunity_owner = is_opportunity_owner;
