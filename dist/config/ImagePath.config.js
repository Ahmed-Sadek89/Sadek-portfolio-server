"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateImagePath = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const generateImagePath = (image) => {
    return `${process.env.BACKEND_LINK}/uploads/${image}`;
};
exports.generateImagePath = generateImagePath;
