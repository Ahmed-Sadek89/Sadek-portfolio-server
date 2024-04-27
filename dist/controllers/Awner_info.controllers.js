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
exports.AwnerInfoController = void 0;
const Awner_info_service_1 = require("../services/Awner_info.service");
const cloudinaryFunctions_config_1 = require("../config/cloudinaryFunctions.config");
const awnerInfoService = new Awner_info_service_1.AwnerInfoService();
class AwnerInfoController {
    getAwnerInfo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const awner_info = yield awnerInfoService.getAwnerInfo();
                res.status(200).json({
                    status: 200,
                    awner_info: awner_info && Object.assign({}, awner_info)
                });
            }
            catch (error) {
                res.status(500).json({
                    status: 500,
                    message: "something went wrong!"
                });
            }
        });
    }
    insertAwnerInfo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const awner_info = yield awnerInfoService.getAwnerInfo();
                if (awner_info) {
                    res.status(401).json({
                        status: 401,
                        message: "you have already your awner info"
                    });
                }
                else {
                    if (!req.file) {
                        throw new Error('No file uploaded');
                    }
                    const uploadedImageToCloudiary = yield (0, cloudinaryFunctions_config_1.uploadToCloudinary)(req.file.path);
                    yield awnerInfoService.insertAwnerInfo(Object.assign(Object.assign({}, req.body), { image: uploadedImageToCloudiary.secure_url }));
                    res.status(200).json({
                        status: 200,
                        message: "your awner info is added successfully"
                    });
                }
            }
            catch (error) {
                console.log(error.message);
                res.status(500).json({
                    status: 500,
                    message: "something went wrong!"
                });
            }
        });
    }
    updateAwnerInfo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.file) {
                    throw new Error('No file uploaded');
                }
                const uploadedImageToCloudiary = yield (0, cloudinaryFunctions_config_1.uploadToCloudinary)(req.file.path);
                yield awnerInfoService.updateAwnerInfo(Object.assign(Object.assign({}, req.body), { image: uploadedImageToCloudiary.secure_url }));
                res.status(200).json({
                    status: 200,
                    message: "Awner_info is updated successfully"
                });
            }
            catch (error) {
                console.log(error.message);
                res.status(500).json({
                    status: 500,
                    message: "something went wrong!"
                });
            }
        });
    }
}
exports.AwnerInfoController = AwnerInfoController;
