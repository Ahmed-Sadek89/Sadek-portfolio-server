"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Category_projects_controllers_1 = require("../controllers/Category_projects.controllers");
const checkAuth_guard_1 = require("../guards/checkAuth.guard");
const router = (0, express_1.default)();
const categoryProjectsController = new Category_projects_controllers_1.CategoryProjectsController();
router.get("/getWithProjects/:id", categoryProjectsController.getWithProjects);
router.use(checkAuth_guard_1.checkAuth);
router.get('/', categoryProjectsController.getAll);
router.get('/:id', categoryProjectsController.getById);
router.post('/', categoryProjectsController.insert);
router.put('/:id', categoryProjectsController.updateById);
router.delete('/:id', categoryProjectsController.deleteById);
router.delete('/', categoryProjectsController.deleteAll);
exports.default = router;
