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
exports.ProjectController = void 0;
const projects_service_1 = require("../services/projects.service");
const Category_projects_service_1 = require("../services/Category_projects.service");
const cloudinaryFunctions_config_1 = require("../config/cloudinaryFunctions.config");
const projectServices = new projects_service_1.ProjectServices();
const categoryprojectsServices = new Category_projects_service_1.CategoryProjectsServices();
class ProjectController {
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const projects = yield projectServices.getAll();
                if (projects.length > 0) {
                    res.status(200).json({
                        status: 200,
                        projects
                    });
                }
                else {
                    res.status(404).json({
                        status: 404,
                        projects: [],
                        message: "No projects!"
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
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const project = yield projectServices.getById(Number(req.params.id));
                if (project) {
                    res.status(200).json({
                        status: 200,
                        project
                    });
                }
                else {
                    res.status(404).json({
                        status: 404,
                        project: {},
                        message: `project number ${req.params.id} is not found`
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
            try {
                if (!req.file) {
                    throw new Error("Path not found");
                }
                const uploadedImage = yield (0, cloudinaryFunctions_config_1.uploadToCloudinary)(req.file.path);
                yield projectServices.insert(Object.assign(Object.assign({}, req.body), { attachment: uploadedImage.secure_url }));
                res.status(200).json({
                    status: 200,
                    result: "new project is created successfully"
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
            try {
                const project = yield projectServices.getById(Number(req.params.id));
                if (project) {
                    if (!req.file) {
                        throw new Error("path not found");
                    }
                    const uploadedImage = yield (0, cloudinaryFunctions_config_1.uploadToCloudinary)(req.file.path);
                    yield projectServices.updateById(project.id, Object.assign(Object.assign({}, req.body), { attachment: uploadedImage.secure_url }));
                    res.status(200).json({
                        status: 200,
                        result: `project number ${project.id} updated successfully`
                    });
                }
                else {
                    res.status(404).json({
                        status: 404,
                        result: `project number ${req.params.id} is not found`
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
                const project = yield projectServices.getById(Number(req.params.id));
                if (project) {
                    yield (0, cloudinaryFunctions_config_1.removeFromCloudinary)(project.attachment);
                    yield projectServices.deleteById(project.id);
                    res.status(200).json({
                        status: 200,
                        result: `project number ${project.id} is deleted successfully`
                    });
                }
                else {
                    res.status(404).json({
                        status: 404,
                        result: `project number ${req.params.id} is not found`
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
    // join
    deleteAllByCategoryId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const projectsByCategoryId = yield categoryprojectsServices.getWithProjects(Number(req.params.categoryId));
                if (projectsByCategoryId) {
                    projectsByCategoryId.projects.map(index => {
                        return (0, cloudinaryFunctions_config_1.removeFromCloudinary)(index.attachment);
                    });
                    yield projectServices.deleteAllByCategoryId(projectsByCategoryId.id);
                }
                else {
                    res.status(404).json({
                        status: 404,
                        result: `category number ${req.params.categoryId} is not found`
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
    getProjectNotesByProjectId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const project = yield projectServices.getById(Number(req.params.id));
                if (project) {
                    const notesByProject = yield projectServices.getProjectNotesByProjectId(project.id);
                    res.status(200).json({
                        status: 200,
                        notesByProject
                    });
                }
                else {
                    res.status(404).json({
                        status: 404,
                        result: `project number ${req.params.id} is not found`
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
}
exports.ProjectController = ProjectController;