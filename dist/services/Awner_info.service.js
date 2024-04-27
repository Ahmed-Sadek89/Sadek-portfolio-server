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
exports.AwnerInfoService = void 0;
const client_1 = require("@prisma/client");
class AwnerInfoService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    insertAwnerInfo(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const awner_info = yield this.prisma.awner_info.create({
                data
            });
            return awner_info;
        });
    }
    getAwnerInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            const awner_info = yield this.prisma.awner_info.findFirst({});
            return awner_info;
        });
    }
    updateAwnerInfo(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prisma.awner_info.update({
                where: { id: 1 },
                data
            });
        });
    }
}
exports.AwnerInfoService = AwnerInfoService;
