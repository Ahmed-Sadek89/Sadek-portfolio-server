"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const checkAuth_guard_1 = require("../guards/checkAuth.guard");
const multer_config_1 = require("../config/multer.config");
const Projects_controller_1 = require("../controllers/Projects.controller");
const router = (0, express_1.default)();
const projectController = new Projects_controller_1.ProjectController();
//
router.get('/', projectController.getAll);
router.get('/:id', projectController.getById);
router.use(checkAuth_guard_1.checkAuth);
router.post('/', multer_config_1.upload.single("attachment"), projectController.insert);
router.put('/:id', multer_config_1.upload.single("attachment"), projectController.updateById);
router.delete("/:id", projectController.deleteById);
router.delete("/categoryId/:categoryId", projectController.deleteAllByCategoryId);
router.get("/notesByProjectId/:id", projectController.getProjectNotesByProjectId);
exports.default = router;
