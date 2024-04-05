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
exports.JobTitlesServices = void 0;
const client_1 = require("@prisma/client");
class JobTitlesServices {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const job_titles = yield this.prisma.job_titles.findMany({});
            return job_titles;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const job_title = yield this.prisma.job_titles.findUnique({
                where: {
                    id
                }
            });
            return job_title;
        });
    }
    insertNewJobTitle(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const job_title = yield this.prisma.job_titles.create({
                data
            });
            return job_title;
        });
    }
    updateJobTitle(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prisma.job_titles.update({
                where: { id },
                data
            });
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prisma.job_titles.delete({
                where: { id }
            });
        });
    }
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prisma.job_titles.deleteMany({});
        });
    }
}
exports.JobTitlesServices = JobTitlesServices;
