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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinksController = void 0;
const Links_service_1 = require("../services/Links.service");
const dotenv_1 = __importDefault(require("dotenv"));
const ImagePath_config_1 = require("../config/ImagePath.config");
const linksServices = new Links_service_1.LinksServices();
class LinksController {
    constructor() {
        dotenv_1.default.config();
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const links = yield linksServices.getAll();
                links === null || links === void 0 ? void 0 : links.map((index) => {
                    index.icon = (0, ImagePath_config_1.generateImagePath)(index.icon);
                });
                res.status(200).json({
                    status: 200,
                    links
                });
            }
            catch (error) {
                console.log(error.message);
                res.status(500).json({
                    status: 500,
                    message: "something went wrong"
                });
            }
        });
    }
    getByLinkType(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { type } = req.query;
                const links = yield linksServices.getByLinkType(type);
                links === null || links === void 0 ? void 0 : links.map((index) => {
                    index.icon = (0, ImagePath_config_1.generateImagePath)(index.icon);
                });
                res.status(200).json({
                    status: 200,
                    links
                });
            }
            catch (error) {
                console.log(error.message);
                res.status(500).json({
                    status: 500,
                    message: "something went wrong"
                });
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const link = yield linksServices.getById(Number(id));
                const ImagePath = link ? (0, ImagePath_config_1.generateImagePath)(link.icon) : "";
                res.status(200).json({
                    status: 200,
                    link: link && Object.assign(Object.assign({}, link), { icon: ImagePath })
                });
            }
            catch (error) {
                res.status(500).json({
                    status: 500,
                    message: "something went wrong"
                });
            }
        });
    }
    insertNewLink(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const icon = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
                yield linksServices.insertNewLink(Object.assign(Object.assign({}, req.body), { icon }));
                res.status(200).json({
                    status: 200,
                    message: "new link inserted successfully"
                });
            }
            catch (error) {
                console.log({ error: error.message });
                res.status(500).json({
                    status: 500,
                    message: "something went wrong"
                });
            }
        });
    }
    updateLink(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const { id } = req.params;
                const icon = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
                yield linksServices.updateLink(Number(id), Object.assign(Object.assign({}, req.body), { icon }));
                res.status(200).json({
                    status: 200,
                    message: `the link number ${id} updated successfully`
                });
            }
            catch (error) {
                res.status(500).json({
                    status: 500,
                    message: "something went wrong"
                });
            }
        });
    }
    deleteById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield linksServices.deleteById(Number(id));
                res.status(200).json({
                    status: 200,
                    message: `the link number ${id} deleted successfully`
                });
            }
            catch (error) {
                res.status(500).json({
                    status: 500,
                    message: "something went wrong"
                });
            }
        });
    }
    deleteAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield linksServices.deleteAll();
                res.status(200).json({
                    status: 200,
                    message: `all links are deleted`
                });
            }
            catch (error) {
                res.status(500).json({
                    status: 500,
                    message: "something went wrong"
                });
            }
        });
    }
}
exports.LinksController = LinksController;
