"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Category_skills_controller_1 = require("../controllers/Category_skills.controller");
const checkAuth_guard_1 = require("../guards/checkAuth.guard");
const categorySkillsRouter = (0, express_1.default)();
const categorySkillsController = new Category_skills_controller_1.CategorySkillsController();
categorySkillsRouter
    .route('/:id/withItsSkills')
    .get(categorySkillsController.getByIdWithSkills);
categorySkillsRouter.use(checkAuth_guard_1.checkAuth);
categorySkillsRouter
    .route('/all')
    .get(categorySkillsController.getAll)
    .delete(categorySkillsController.deleteAll);
categorySkillsRouter
    .route('/')
    .post(categorySkillsController.insert);
categorySkillsRouter
    .route('/:id')
    .get(categorySkillsController.getById)
    .put(categorySkillsController.updateById)
    .delete(categorySkillsController.deleteById);
exports.default = categorySkillsRouter;
