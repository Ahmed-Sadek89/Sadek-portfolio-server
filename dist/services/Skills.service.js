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
exports.SkillsServices = void 0;
const client_1 = require("@prisma/client");
class SkillsServices {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    getByCategoryId(category_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prisma.skills.findMany({
                where: { category_id }
            });
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prisma.skills.findUnique({
                where: { id }
            });
        });
    }
    insert(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newSkill = yield this.prisma.skills.create({
                data: {
                    title: data.title,
                    icon: data.icon || '',
                    category_id: data.category_id
                }
            });
            return newSkill;
        });
    }
    updateById(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prisma.skills.update({
                where: { id },
                data
            });
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prisma.skills.delete({
                where: { id }
            });
        });
    }
    deleteByCategoryId(category_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prisma.skills.deleteMany({
                where: { category_id }
            });
        });
    }
}
exports.SkillsServices = SkillsServices;
