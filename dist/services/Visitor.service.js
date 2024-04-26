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
exports.VisitorService = void 0;
const client_1 = require("@prisma/client");
class VisitorService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    insert(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prisma.visitor.create({
                data
            });
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prisma.visitor.findMany({});
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prisma.visitor.findUnique({
                where: { id }
            });
        });
    }
    updateById(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prisma.visitor.update({
                where: { id },
                data
            });
        });
    }
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prisma.visitor.deleteMany({});
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prisma.visitor.delete({
                where: { id }
            });
        });
    }
    getMessagesByVisitorId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prisma.visitor.findUnique({
                where: { id },
                include: { messages: true }
            });
        });
    }
    getNotesByVisitorId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prisma.visitor.findUnique({
                where: { id },
                include: { project_notes: true }
            });
        });
    }
}
exports.VisitorService = VisitorService;
