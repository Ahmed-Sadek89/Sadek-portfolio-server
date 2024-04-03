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
exports.getAwnerById = exports.getAllAwners = exports.postAwnerController = void 0;
const Awner_service_1 = require("../services/Awner.service");
const postAwnerController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, Awner_service_1.postAwnerService)(req.body);
        res.status(200).json({
            status: 200,
            result: "new awner inserted successfully"
        });
    }
    catch (error) {
        res.status(500).json({
            status: 500,
            message: "something went wrong!"
        });
    }
});
exports.postAwnerController = postAwnerController;
const getAllAwners = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const awners = yield (0, Awner_service_1.findAllAwnersService)();
        res.status(200).json({
            status: 200,
            awners
        });
    }
    catch (error) {
        res.status(500).json({
            status: 500,
            message: "something went wrong!"
        });
    }
});
exports.getAllAwners = getAllAwners;
const getAwnerById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const awner = yield (0, Awner_service_1.findAwnerById)(Number(id));
        res.status(200).json({
            status: 200,
            awner
        });
    }
    catch (error) {
        res.status(500).json({
            status: 500,
            message: "something went wrong!"
        });
    }
});
exports.getAwnerById = getAwnerById;
