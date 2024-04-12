"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Awner_controllers_1 = require("../controllers/Awner.controllers");
const checkAuth_guard_1 = require("../guards/checkAuth.guard");
const router = (0, express_1.Router)();
const awnerController = new Awner_controllers_1.AwnerController();
router.post('/register', awnerController.registerAwnerController);
router.post('/login', awnerController.loginAwnerController);
router.use(checkAuth_guard_1.checkAuth);
router.get('/getAll', awnerController.getAllAwners);
router.get('/:id', awnerController.getAwnerById);
router.delete('/distroy', awnerController.deleteAllAwnersController);
router.delete('/:id', awnerController.deleteAwnerByIdController);
router.put('/:id', awnerController.updateAwnerById);
// router
//     .route("/:id" => here, this path is for all those HTTP request pips)
//     .get(yourGetControllerFunction)
//     .post(yourPostControllerFunction)
exports.default = router;