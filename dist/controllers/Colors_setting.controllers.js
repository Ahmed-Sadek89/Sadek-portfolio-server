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
exports.ColorSettingController = void 0;
const ColorSetting_service_1 = require("../services/ColorSetting.service");
const colorSettingServices = new ColorSetting_service_1.ColorSettingServices();
class ColorSettingController {
    getColorSetting(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const colorSetting = yield colorSettingServices.getColorSetting();
                res.status(200).json({
                    status: 200,
                    colorSetting
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
    insertColorSetting(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const colorSetting = yield colorSettingServices.getColorSetting();
                if (colorSetting) {
                    res.status(401).json({
                        status: 401,
                        message: "you have already your color setting"
                    });
                }
                else {
                    yield colorSettingServices.insertColorSetting(req.body);
                    res.status(200).json({
                        status: 200,
                        message: "your color setting is added successfully"
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
    updateColorSetting(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield colorSettingServices.updateColorSetting(req.body);
                res.status(200).json({
                    status: 200,
                    message: "colors setting is updated successfully"
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
exports.ColorSettingController = ColorSettingController;
