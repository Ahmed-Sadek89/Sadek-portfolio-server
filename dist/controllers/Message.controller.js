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
exports.MessageController = void 0;
const Messages_service_1 = require("../services/Messages.service");
const Visitor_service_1 = require("../services/Visitor.service");
const messageService = new Messages_service_1.MessageService();
const visitorService = new Visitor_service_1.VisitorService();
class MessageController {
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const messages = yield messageService.getAll();
                if (messages.length > 0) {
                    res.status(200).json({
                        status: 200,
                        count: messages.length,
                        messages
                    });
                }
                else {
                    res.status(404).json({
                        status: 404,
                        messages: []
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
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const message = yield messageService.getById(Number(req.params.id));
                if (message) {
                    res.status(200).json({
                        status: 200,
                        message
                    });
                }
                else {
                    res.status(404).json({
                        status: 404,
                        message: {}
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
    getAllByVisitorId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const messages = yield messageService.getAllByVisitorId(req.params.visitor_id);
                if (messages.length > 0) {
                    res.status(200).json({
                        status: 200,
                        count: messages.length,
                        messages
                    });
                }
                else {
                    res.status(404).json({
                        status: 404,
                        message: []
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
    insert(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield messageService.insert(req.body);
                res.status(200).json({
                    status: 200,
                    result: "new message inserted successfully"
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
    deleteAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield messageService.deleteAll();
                res.status(200).json({
                    status: 200,
                    result: "all messages deleted successfully"
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
    deleteAllByVisitorId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const visitor = yield visitorService.getById(req.params.visitor_id);
                if (visitor) {
                    yield messageService.deleteByVisitorId(visitor.id);
                    res.status(200).json({
                        status: 200,
                        result: `all messages related to visitor number ${visitor.id} are deleted successfully`
                    });
                }
                else {
                    res.status(404).json({
                        status: 404,
                        result: `visitor number ${req.params.visitor_id} is not found`
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
                const message = yield messageService.getById(Number(req.params.id));
                if (message) {
                    yield messageService.deleteById(message.id);
                    res.status(200).json({
                        status: 200,
                        result: `message number ${message.id} is deleted successfully`
                    });
                }
                else {
                    res.status(404).json({
                        status: 404,
                        result: `message number ${req.params.visitor_id} is not found`
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
exports.MessageController = MessageController;
