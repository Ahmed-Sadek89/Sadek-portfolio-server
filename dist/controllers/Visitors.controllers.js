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
exports.VisitorController = void 0;
const Visitor_service_1 = require("../services/Visitor.service");
const OAuth_controllers_1 = require("./OAuth.controllers");
const visitorServices = new Visitor_service_1.VisitorService();
class VisitorController extends OAuth_controllers_1.OAuthController {
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const visitor = yield visitorServices.getById(req.params.id);
                if (visitor) {
                    res.status(200).json({
                        status: 200,
                        visitor
                    });
                }
                else {
                    res.status(404).json({
                        status: 404,
                        visitor: {}
                    });
                }
            }
            catch (error) {
                console.log(error.message);
                res.status(500).json({
                    status: 500,
                    message: "Internet Services Error"
                });
            }
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const visitors = yield visitorServices.getAll();
                if (visitors.length > 0) {
                    res.status(200).json({
                        status: 200,
                        count: visitors.length,
                        visitors
                    });
                }
                else {
                    res.status(404).json({
                        status: 404,
                        visitors: []
                    });
                }
            }
            catch (error) {
                console.log(error.message);
                res.status(500).json({
                    status: 500,
                    message: "Internet Services Error"
                });
            }
        });
    }
    deleteById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const visitor = yield visitorServices.getById(req.params.id);
                if (visitor) {
                    yield visitorServices.deleteById(visitor.id);
                    res.status(200).json({
                        status: 200,
                        result: `visitor number ${visitor.id} is deleted successfully`
                    });
                }
                else {
                    res.status(404).json({
                        status: 404,
                        result: `visitor number ${req.params.id} is not found`
                    });
                }
            }
            catch (error) {
                console.log(error.message);
                res.status(500).json({
                    status: 500,
                    message: "Internet Services Error"
                });
            }
        });
    }
    deleteAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield visitorServices.deleteAll();
                res.status(200).json({
                    status: 200,
                    result: `All visitors are deleted successfully`
                });
            }
            catch (error) {
                console.log(error.message);
                res.status(500).json({
                    status: 500,
                    message: "Internet Services Error"
                });
            }
        });
    }
    getMessagesByVisitorId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const visitor = yield visitorServices.getById(req.params.id);
                if (visitor) {
                    const messagesByVisitorId = yield visitorServices.getMessagesByVisitorId(visitor.id);
                    res.status(200).json({
                        status: 200,
                        result: messagesByVisitorId
                    });
                }
                else {
                    res.status(404).json({
                        status: 404,
                        result: `visitor number ${req.params.id} is not found`
                    });
                }
            }
            catch (error) {
                console.log(error.message);
                res.status(500).json({
                    status: 500,
                    message: "Internet Services Error"
                });
            }
        });
    }
    getnotesByVisitorId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const visitor = yield visitorServices.getById(req.params.id);
                if (visitor) {
                    const notesByVisitorId = yield visitorServices.getNotesByVisitorId(visitor.id);
                    res.status(200).json({
                        status: 200,
                        result: notesByVisitorId
                    });
                }
                else {
                    res.status(404).json({
                        status: 404,
                        result: `visitor number ${req.params.id} is not found`
                    });
                }
            }
            catch (error) {
                console.log(error.message);
                res.status(500).json({
                    status: 500,
                    message: "Internet Services Error"
                });
            }
        });
    }
}
exports.VisitorController = VisitorController;
