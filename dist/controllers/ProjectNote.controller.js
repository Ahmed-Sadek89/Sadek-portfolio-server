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
exports.ProjectNoteController = void 0;
const ProjectNote_service_1 = require("../services/ProjectNote.service");
const Visitor_service_1 = require("../services/Visitor.service");
const Projects_service_1 = require("../services/Projects.service");
const projectNoteService = new ProjectNote_service_1.ProjectNoteService();
const visitorService = new Visitor_service_1.VisitorService();
const projectService = new Projects_service_1.ProjectServices();
class ProjectNoteController {
    insert(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield projectNoteService.insert(Object.assign(Object.assign({}, req.body), { project_id: Number(req.body.project_id) }));
                res.status(200).json({
                    status: 200,
                    message: "new project notes inserted successfully"
                });
            }
            catch (error) {
                console.log(error.message);
                res.status(500).json({
                    status: 500,
                    message: "Internet Services Error"
                });
            }
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const notes = yield projectNoteService.getAll();
                if (notes.length > 0) {
                    res.status(200).json({
                        status: 200,
                        count: notes.length,
                        project_notes: notes
                    });
                }
                else {
                    res.status(404).json({
                        status: 404,
                        project_notes: []
                    });
                }
            }
            catch (error) {
                console.log(error.message);
                res.status(500).json({
                    status: 500,
                    message: "Internet Services Error"
                });
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const note = yield projectNoteService.getById(Number(req.params.id));
                if (note) {
                    res.status(200).json({
                        status: 200,
                        project_notes: note
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
                    message: "Internet Services Error"
                });
            }
        });
    }
    getAllByVisitorId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const visitor = yield visitorService.getById(req.params.visitor_id);
                if (visitor) {
                    const notes = yield projectNoteService.getAllByVisitorId(visitor.id);
                    res.status(200).json({
                        status: 200,
                        count: notes.length,
                        project_notes: notes
                    });
                }
                else {
                    res.status(404).json({
                        status: 404,
                        result: `visitor number ${req.params.visitor_id} is not found`
                    });
                }
            }
            catch (error) {
                console.log(error.message);
                res.status(500).json({
                    status: 500,
                    message: "Internet Services Error"
                });
            }
        });
    }
    getAllByProjectId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const project = yield projectService.getById(Number(req.params.project_id));
                if (project) {
                    const notes = yield projectNoteService.getAllByProjectId(Number(project.id));
                    res.status(200).json({
                        status: 200,
                        count: notes.length,
                        project_notes: notes
                    });
                }
                else {
                    res.status(404).json({
                        status: 404,
                        result: `project number ${req.params.project_id} is not found`
                    });
                }
            }
            catch (error) {
                console.log(error.message);
                res.status(500).json({
                    status: 500,
                    message: "Internet Services Error"
                });
            }
        });
    }
    deleteAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield projectNoteService.deleteAll();
                res.status(200).json({
                    status: 200,
                    message: "All project notes deleted successfully"
                });
            }
            catch (error) {
                console.log(error.message);
                res.status(500).json({
                    status: 500,
                    message: "Internet Services Error"
                });
            }
        });
    }
    deleteById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const note = yield projectNoteService.getById(Number(req.params.id));
                if (note) {
                    yield projectNoteService.deleteById(note.id);
                    res.status(200).json({
                        status: 200,
                        result: `project note number ${req.params.id} is deleted successfully`
                    });
                }
                else {
                    res.status(404).json({
                        status: 404,
                        result: `project note number ${req.params.id} is not found`
                    });
                }
            }
            catch (error) {
                console.log(error.message);
                res.status(500).json({
                    status: 500,
                    message: "Internet Services Error"
                });
            }
        });
    }
    deleteAllByVisitorId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const visitor = yield visitorService.getById(req.params.visitor_id);
                if (visitor) {
                    yield projectNoteService.deleteAllByVisitorId(visitor.id);
                    res.status(200).json({
                        status: 200,
                        result: `project note number ${visitor.id} is deleted successfully`
                    });
                }
                else {
                    res.status(404).json({
                        status: 404,
                        result: `visitor number ${req.params.visitor_id} is not found`
                    });
                }
            }
            catch (error) {
                console.log(error.message);
                res.status(500).json({
                    status: 500,
                    message: "Internet Services Error"
                });
            }
        });
    }
    deleteAllByProjectId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const project = yield projectService.getById(Number(req.params.project_id));
                if (project) {
                    yield projectNoteService.deleteAllByProjectId(Number(project.id));
                    res.status(200).json({
                        status: 200,
                        result: `project note number ${project.id} is deleted successfully`
                    });
                }
                else {
                    res.status(404).json({
                        status: 404,
                        result: `project number ${req.params.project_id} is not found`
                    });
                }
            }
            catch (error) {
                console.log(error.message);
                res.status(500).json({
                    status: 500,
                    message: "Internet Services Error"
                });
            }
        });
    }
}
exports.ProjectNoteController = ProjectNoteController;
