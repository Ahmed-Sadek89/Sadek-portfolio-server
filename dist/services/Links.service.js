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
exports.LinksServices = void 0;
const client_1 = require("@prisma/client");
class LinksServices {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const links = yield this.prisma.links.findMany({});
            return links;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const link = yield this.prisma.links.findUnique({
                where: {
                    id
                }
            });
            return link;
        });
    }
    getByLinkType(type) {
        return __awaiter(this, void 0, void 0, function* () {
            const link = yield this.prisma.links.findMany({
                where: {
                    type
                }
            });
            return link;
        });
    }
    insertNewLink(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const link = yield this.prisma.links.create({
                data
            });
            return link;
        });
    }
    updateLink(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prisma.links.update({
                where: { id },
                data
            });
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prisma.links.delete({
                where: { id }
            });
        });
    }
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prisma.links.deleteMany({});
        });
    }
}
exports.LinksServices = LinksServices;
