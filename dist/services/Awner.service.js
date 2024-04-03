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
exports.findAwnerById = exports.findAllAwnersService = exports.postAwnerService = void 0;
const client_1 = require("@prisma/client");
const bcript_service_1 = require("./bcript.service");
const prisma = new client_1.PrismaClient();
const bcrypt = new bcript_service_1.BcryptService();
const postAwnerService = ({ email, password }) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield bcrypt.encryptPassword(password);
    const awner = yield prisma.awner.create({
        data: {
            email,
            password: hashedPassword
        }
    });
    return awner;
});
exports.postAwnerService = postAwnerService;
const findAllAwnersService = () => __awaiter(void 0, void 0, void 0, function* () {
    const awners = yield prisma.awner.findMany();
    let result = [];
    awners.map((index) => {
        result.push({ id: index.id, email: index.email });
    });
    return result;
});
exports.findAllAwnersService = findAllAwnersService;
const findAwnerById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const awner = yield prisma.awner.findUnique({
        where: {
            id
        }
    });
    const result = awner ? {
        id: Number(id),
        email: awner.email
    } : "no awner in this ID";
    return;
});
exports.findAwnerById = findAwnerById;
