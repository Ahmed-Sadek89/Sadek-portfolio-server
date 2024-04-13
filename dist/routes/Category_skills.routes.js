"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Category_skills_controller_1 = require("../controllers/Category_skills.controller");
const checkAuth_guard_1 = require("../guards/checkAuth.guard");
const router = (0, express_1.default)();
const categorySkillsController = new Category_skills_controller_1.CategorySkillsController();
router.get('/all', checkAuth_guard_1.checkAuth, categorySkillsController.getAll);
router.delete('/all', checkAuth_guard_1.checkAuth, categorySkillsController.deleteAll);
router.post('/', checkAuth_guard_1.checkAuth, categorySkillsController.insert);
router.get('/:id', checkAuth_guard_1.checkAuth, categorySkillsController.getById);
router.put('/:id', checkAuth_guard_1.checkAuth, categorySkillsController.updateById);
router.delete('/:id', checkAuth_guard_1.checkAuth, categorySkillsController.deleteById);
router.get('/withItsSkills/:id', categorySkillsController.getByIdWithSkills);
exports.default = router;
