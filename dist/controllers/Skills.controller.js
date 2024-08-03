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
exports.SkillsController = void 0;
const Skills_service_1 = require("../services/Skills.service");
const Category_skills_service_1 = require("../services/Category_skills.service");
const cloudinaryFunctions_config_1 = require("../config/cloudinaryFunctions.config");
const skillsServices = new Skills_service_1.SkillsServices();
const categoryskillsServices = new Category_skills_service_1.CategorySkillsServices();
class SkillsController {
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const skill = yield skillsServices.getById(Number(req.params.id));
                if (skill) {
                    res.status(200).json({
                        status: 200,
                        skill
                    });
                }
                else {
                    res.status(404).json({
                        status: 404,
                        skill: null
                    });
                }
            }
            catch (error) {
                console.log(error.message);
                res.status(500).json({
                    status: 500,
                    message: "something went wrong"
                });
            }
        });
    }
    insert(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const title = req.body.title;
            const category_id = Number(req.body.category_id);
            try {
                if (!req.file) {
                    throw new Error("path not found");
                }
                const uploadedImage = yield (0, cloudinaryFunctions_config_1.uploadToCloudinary)((_a = req.file) === null || _a === void 0 ? void 0 : _a.path);
                yield skillsServices.insert({ title, icon: uploadedImage.secure_url, category_id });
                res.status(200).json({
                    status: 200,
                    result: `new skill added successfully`
                });
            }
            catch (error) {
                console.log(error.message);
                res.status(500).json({
                    status: 500,
                    message: "something went wrong"
                });
            }
        });
    }
    updateById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const title = req.body.title;
            const category_id = Number(req.body.category_id);
            try {
                const skill = yield skillsServices.getById(Number(req.params.id));
                if (skill) {
                    if (!req.file) {
                        throw new Error("path not found");
                    }
                    const uploadedImage = yield (0, cloudinaryFunctions_config_1.uploadToCloudinary)((_a = req.file) === null || _a === void 0 ? void 0 : _a.path);
                    yield skillsServices.updateById(skill.id, { title, icon: uploadedImage.secure_url, category_id });
                    res.status(200).json({
                        status: 200,
                        result: `skill number ${req.params.id} is updated successfully`
                    });
                }
                else {
                    res.status(404).json({
                        status: 404,
                        skill: `skill number ${req.params.id} is not found`
                    });
                }
            }
            catch (error) {
                console.log(error.message);
                res.status(500).json({
                    status: 500,
                    message: "something went wrong"
                });
            }
        });
    }
    deleteById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const skill = yield skillsServices.getById(Number(req.params.id));
                if (skill) {
                    yield (0, cloudinaryFunctions_config_1.removeFromCloudinary)(skill.icon);
                    yield skillsServices.deleteById(skill.id);
                    res.status(200).json({
                        status: 200,
                        result: `skill number ${req.params.id} is deleted successfully`
                    });
                }
                else {
                    res.status(404).json({
                        status: 404,
                        skill: `skill number ${req.params.id} is not found`
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
    deleteByCategoryId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categoryskills = yield categoryskillsServices.getByIdWithSkills(Number(req.params.category_id));
                if (categoryskills) {
                    categoryskills.Skills.map(index => {
                        return (0, cloudinaryFunctions_config_1.removeFromCloudinary)(index.icon);
                    });
                    yield skillsServices.deleteByCategoryId(Number(categoryskills.id));
                    res.status(200).json({
                        status: 200,
                        result: `all skills related to category number ${categoryskills.id} is deleted successfully`
                    });
                }
                else {
                    res.status(404).json({
                        status: 404,
                        skill: `category number ${req.params.category_id} is not found`
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
}
exports.SkillsController = SkillsController;
