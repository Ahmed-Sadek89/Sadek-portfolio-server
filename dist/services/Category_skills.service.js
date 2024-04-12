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
exports.CategorySkillsServices = void 0;
const client_1 = require("@prisma/client");
class CategorySkillsServices {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prisma.category_skills.findMany({});
        });
    }
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prisma.category_skills.deleteMany({});
        });
    }
    insert(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prisma.category_skills.create({
                data
            });
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prisma.category_skills.findUnique({
                where: { id }
            });
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prisma.category_skills.delete({
                where: { id }
            });
        });
    }
    updateById(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prisma.category_skills.update({
                where: { id },
                data
            });
        });
    }
    getByIdWithSkills(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prisma.category_skills.findUnique({
                where: { id },
                include: { skills: true }
            });
        });
    }
}
exports.CategorySkillsServices = CategorySkillsServices;
