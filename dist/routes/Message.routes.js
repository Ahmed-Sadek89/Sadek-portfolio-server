"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Message_controller_1 = require("../controllers/Message.controller");
const checkAuth_guard_1 = require("../guards/checkAuth.guard");
const messageContoller = new Message_controller_1.MessageController();
const router = (0, express_1.default)();
router.post('/', messageContoller.insert);
router.get('/', checkAuth_guard_1.checkAuth, messageContoller.getAll);
router.get('/:id', checkAuth_guard_1.checkAuth, messageContoller.getById);
router.get('/visitor/:visitor_id', checkAuth_guard_1.checkAuth, messageContoller.getAllByVisitorId);
router.delete('/', checkAuth_guard_1.checkAuth, messageContoller.deleteAll);
router.delete('/:id', checkAuth_guard_1.checkAuth, messageContoller.deleteById);
router.delete('/visitor/:visitor_id', checkAuth_guard_1.checkAuth, messageContoller.deleteAllByVisitorId);
exports.default = router;
