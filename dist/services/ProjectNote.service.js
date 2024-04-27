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
exports.ProjectNoteService = void 0;
const client_1 = require("@prisma/client");
class ProjectNoteService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    insert(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prisma.project_notes.create({
                data
            });
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prisma.project_notes.findMany({});
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prisma.project_notes.findUnique({
                where: { id }
            });
        });
    }
    getAllByVisitorId(visitor_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prisma.project_notes.findMany({
                where: { visitor_id }
            });
        });
    }
    getAllByProjectId(project_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prisma.project_notes.findMany({
                where: { project_id }
            });
        });
    }
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prisma.project_notes.deleteMany({});
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prisma.project_notes.delete({
                where: { id }
            });
        });
    }
    deleteAllByVisitorId(visitor_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prisma.project_notes.deleteMany({
                where: { visitor_id }
            });
        });
    }
    deleteAllByProjectId(project_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prisma.project_notes.deleteMany({
                where: { project_id }
            });
        });
    }
}
exports.ProjectNoteService = ProjectNoteService;
