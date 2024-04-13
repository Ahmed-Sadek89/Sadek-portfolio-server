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
exports.CategorySkillsController = void 0;
const Category_skills_service_1 = require("../services/Category_skills.service");
const categorySkillsServices = new Category_skills_service_1.CategorySkillsServices();
class CategorySkillsController {
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category_skills = yield categorySkillsServices.getAll();
                res.status(200).json({
                    status: 200,
                    category_skills
                });
            }
            catch (error) {
                res.status(500).json({
                    status: 500,
                    message: "something went wrong"
                });
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const category_skills = yield categorySkillsServices.getById(Number(id));
                res.status(200).json({
                    status: 200,
                    category_skills
                });
            }
            catch (error) {
                res.status(500).json({
                    status: 500,
                    message: "something went wrong"
                });
            }
        });
    }
    getByIdWithSkills(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const category_skills = yield categorySkillsServices.getByIdWithSkills(Number(id));
                if (category_skills) {
                    res.status(200).json({
                        status: 200,
                        category_skills
                    });
                }
                else {
                    res.status(404).json({
                        status: 404,
                        category_skills
                    });
                }
            }
            catch (error) {
                res.status(500).json({
                    status: 500,
                    message: "something went wrong"
                });
            }
        });
    }
    insert(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield categorySkillsServices.insert(req.body);
                res.status(200).json({
                    status: 200,
                    result: "new category_skills created successfully"
                });
            }
            catch (error) {
                res.status(500).json({
                    status: 500,
                    message: "something went wrong"
                });
            }
        });
    }
    updateById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield categorySkillsServices.updateById(Number(req.params.id), req.body);
                res.status(200).json({
                    status: 200,
                    result: `Category_skills number ${req.params.id} updated successfully`
                });
            }
            catch (error) {
                res.status(500).json({
                    status: 500,
                    message: "something went wrong"
                });
            }
        });
    }
    deleteById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield categorySkillsServices.deleteById(Number(id));
                res.status(200).json({
                    status: 200,
                    result: `Category_skills number ${id} deleted successfully`
                });
            }
            catch (error) {
                res.status(500).json({
                    status: 500,
                    message: "something went wrong"
                });
            }
        });
    }
    deleteAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield categorySkillsServices.deleteAll();
                res.status(200).json({
                    status: 200,
                    result: `All category_skills deleted successfully`
                });
            }
            catch (error) {
                res.status(500).json({
                    status: 500,
                    message: "something went wrong"
                });
            }
        });
    }
}
exports.CategorySkillsController = CategorySkillsController;
