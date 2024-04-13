"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Skills_controller_1 = require("../controllers/Skills.controller");
const checkAuth_guard_1 = require("../guards/checkAuth.guard");
const multer_config_1 = require("../config/multer.config");
const router = (0, express_1.default)();
const skillsController = new Skills_controller_1.SkillsController();
router.use(checkAuth_guard_1.checkAuth);
router.get('/:id', skillsController.getById);
router.put('/:id', skillsController.updateById);
router.delete('/:id', skillsController.deleteById);
router.post('/', multer_config_1.upload.single("icon"), skillsController.insert);
router.delete('/all/:category_id', skillsController.deleteById);
exports.default = router;
