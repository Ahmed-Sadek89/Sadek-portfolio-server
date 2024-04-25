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
exports.categoryProjectsController = void 0;
const Category_projects_service_1 = require("../services/Category_projects.service");
const categoryProjectsServices = new Category_projects_service_1.CategoryProjectsServices();
class categoryProjectsController {
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category_projects = yield categoryProjectsServices.getAll();
                if (category_projects.length > 0) {
                    res.status(200).json({
                        status: 200,
                        category_projects
                    });
                }
                else {
                    res.status(404).json({
                        status: 404,
                        category_projects: []
                    });
                }
            }
            catch (error) {
                console.log(error.message);
                res.status(500).json({
                    status: 500,
                    message: "Enternet services error"
                });
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category_project = yield categoryProjectsServices.getById(Number(req.params.id));
                if (category_project) {
                    res.status(200).json({
                        status: 200,
                        category_project
                    });
                }
                else {
                    res.status(404).json({
                        status: 404,
                        category_project: {}
                    });
                }
            }
            catch (error) {
                console.log(error.message);
                res.status(500).json({
                    status: 500,
                    message: "Enternet Services Error"
                });
            }
        });
    }
    getWithProjects(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category_project = yield categoryProjectsServices.getById(Number(req.params.id));
                if (category_project) {
                    const projectsByCategory = yield categoryProjectsServices.getWithProjects(category_project.id);
                    res.status(200).json({
                        status: 200,
                        projectsByCategory
                    });
                }
                else {
                    res.status(404).json({
                        status: 404,
                        category_project: {}
                    });
                }
            }
            catch (error) {
                console.log(error.message);
                res.status(500).json({
                    status: 500,
                    message: "Enternet Services Error"
                });
            }
        });
    }
    insert(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield categoryProjectsServices.insert(req.body);
                res.status(200).json({
                    status: 200,
                    result: "new category_projects created successfully"
                });
            }
            catch (error) {
                console.log(error.message);
                res.status(500).json({
                    status: 500,
                    message: "Enternet Services Error"
                });
            }
        });
    }
    updateById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category_project = yield categoryProjectsServices.getById(Number(req.params.id));
                if (category_project) {
                    yield categoryProjectsServices.updateById(req.body, category_project.id);
                    res.status(200).json({
                        status: 200,
                        result: `Category_projects number ${category_project.id} updated successfully`
                    });
                }
                else {
                    res.status(404).json({
                        status: 404,
                        result: `Category_projects number ${req.params.id} is not found`
                    });
                }
            }
            catch (error) {
                console.log(error.message);
                res.status(500).json({
                    status: 500,
                    message: "Enternet Services Error"
                });
            }
        });
    }
    deleteById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category_project = yield categoryProjectsServices.getById(Number(req.params.id));
                if (category_project) {
                    yield categoryProjectsServices.deleteById(category_project.id);
                    res.status(200).json({
                        status: 200,
                        result: `category_project number ${category_project.id} is deleted successfully`
                    });
                }
                else {
                    res.status(404).json({
                        status: 404,
                        result: `category_project number ${req.params.id} is not found`
                    });
                }
            }
            catch (error) {
                console.log(error.message);
                res.status(500).json({
                    status: 500,
                    message: "Enternet Services Error"
                });
            }
        });
    }
    deleteAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield categoryProjectsServices.deleteAll();
                res.status(200).json({
                    status: 200,
                    result: `All category_project deleted successfully`
                });
            }
            catch (error) {
                console.log(error.message);
                res.status(500).json({
                    status: 500,
                    message: "Enternet Services Error"
                });
            }
        });
    }
}
exports.categoryProjectsController = categoryProjectsController;
