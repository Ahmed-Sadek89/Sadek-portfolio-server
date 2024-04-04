"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Awner_controllers_1 = require("../controllers/Awner.controllers");
const checkAuth_guard_1 = require("../guards/checkAuth.guard");
const router = (0, express_1.Router)();
const awnerController = new Awner_controllers_1.AwnerController();
router.post('/register', awnerController.registerAwnerController);
router.post('/login', awnerController.loginAwnerController);
router.get('/getAll', checkAuth_guard_1.checkAuth, awnerController.getAllAwners);
router.get('/:id', checkAuth_guard_1.checkAuth, awnerController.getAwnerById);
router.delete('/distroy', checkAuth_guard_1.checkAuth, awnerController.deleteAllAwnersController);
router.delete('/:id', checkAuth_guard_1.checkAuth, awnerController.deleteAwnerByIdController);
router.put('/:id', checkAuth_guard_1.checkAuth, awnerController.updateAwnerById);
exports.default = router;
