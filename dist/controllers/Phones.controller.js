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
exports.PhonesController = void 0;
const Phones_service_1 = require("../services/Phones.service");
const phonesServices = new Phones_service_1.PhonesServices();
class PhonesController {
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const phones = yield phonesServices.getAll();
                res.status(200).json({
                    status: 200,
                    phones
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
                const phone = yield phonesServices.getById(Number(id));
                res.status(200).json({
                    status: 200,
                    phone
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
    insertNewPhone(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield phonesServices.insertNewPhone(req.body);
                res.status(200).json({
                    status: 200,
                    message: "new phone inserted successfully"
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
    updatePhone(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield phonesServices.updatePhone(Number(id), req.body);
                res.status(200).json({
                    status: 200,
                    message: `the phone number ${id} updated successfully`
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
                yield phonesServices.deleteById(Number(id));
                res.status(200).json({
                    status: 200,
                    message: `the phone number ${id} deleted successfully`
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
                yield phonesServices.deleteAll();
                res.status(200).json({
                    status: 200,
                    message: `all phones are deleted`
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
exports.PhonesController = PhonesController;
