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
exports.LinksController = void 0;
const Links_service_1 = require("../services/Links.service");
const cloudinaryFunctions_config_1 = require("../config/cloudinaryFunctions.config");
const linksServices = new Links_service_1.LinksServices();
class LinksController {
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const links = yield linksServices.getAll();
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
                res.status(200).json({
                    status: 200,
                    link: link && Object.assign({}, link)
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
                if (!req.file) {
                    throw new Error("path not found");
                }
                const uploadedImage = yield (0, cloudinaryFunctions_config_1.uploadToCloudinary)((_a = req.file) === null || _a === void 0 ? void 0 : _a.path);
                yield linksServices.insertNewLink(Object.assign(Object.assign({}, req.body), { icon: uploadedImage.secure_url }));
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
                if (!req.file) {
                    throw new Error("path not found");
                }
                const uploadedImage = yield (0, cloudinaryFunctions_config_1.uploadToCloudinary)((_a = req.file) === null || _a === void 0 ? void 0 : _a.path);
                yield linksServices.updateLink(Number(id), Object.assign(Object.assign({}, req.body), { icon: uploadedImage.secure_url }));
                res.status(200).json({
                    status: 200,
                    message: `the link number ${id} updated successfully`
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
    deleteById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const link = yield linksServices.getById(Number(id));
                if (link) {
                    yield (0, cloudinaryFunctions_config_1.removeFromCloudinary)(link.icon);
                    yield linksServices.deleteById(Number(id));
                    res.status(200).json({
                        status: 200,
                        message: `the link number ${id} deleted successfully`
                    });
                }
                else {
                    res.status(404).json({
                        status: 404,
                        message: `the link number ${id} is not found to deleted`
                    });
                }
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
    deleteAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const links = yield linksServices.getAll();
                if (links.length > 0) {
                    links.map(index => {
                        return (0, cloudinaryFunctions_config_1.removeFromCloudinary)(index.icon);
                    });
                    yield linksServices.deleteAll();
                    res.status(200).json({
                        status: 200,
                        message: `all links are deleted`
                    });
                }
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
