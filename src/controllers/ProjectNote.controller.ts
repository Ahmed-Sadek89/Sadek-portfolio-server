import { Request, Response } from "express";
import { ProjectNoteService } from "../services/ProjectNote.service";
import { VisitorService } from "../services/Visitor.service";
import { ProjectServices } from "../services/Projects.service";

const projectNoteService = new ProjectNoteService();
const visitorService = new VisitorService();
const projectService = new ProjectServices();

export class ProjectNoteController {

    async insert(req: Request, res: Response) {
        try {
            await projectNoteService.insert({
                ...req.body,
                project_id: Number(req.body.project_id)
            })
            res.status(200).json({
                status: 200,
                message: "new project notes inserted successfully"
            })
        } catch (error: any) {
            console.log(error.message);
            res.status(500).json({
                status: 500,
                message: "Internet Services Error"
            })
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const notes = await projectNoteService.getAll();
            if (notes.length > 0) {
                res.status(200).json({
                    status: 200,
                    count: notes.length,
                    project_notes: notes
                })
            } else {
                res.status(404).json({
                    status: 404,
                    project_notes: []
                })
            }
        } catch (error: any) {
            console.log(error.message);
            res.status(500).json({
                status: 500,
                message: "Internet Services Error"
            })
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const note = await projectNoteService.getById(Number(req.params.id));
            if (note) {
                res.status(200).json({
                    status: 200,
                    project_notes: note
                })
            } else {
                res.status(404).json({
                    status: 404,
                    result: `project number ${req.params.id} is not found`
                })
            }
        } catch (error: any) {
            console.log(error.message);
            res.status(500).json({
                status: 500,
                message: "Internet Services Error"
            })
        }
    }

    async getAllByVisitorId(req: Request, res: Response) {
        try {
            const visitor = await visitorService.getById(req.params.visitor_id)
            if (visitor) {
                const notes = await projectNoteService.getAllByVisitorId(visitor.id);
                res.status(200).json({
                    status: 200,
                    count: notes.length,
                    project_notes: notes
                })
            } else {
                res.status(404).json({
                    status: 404,
                    result: `visitor number ${req.params.visitor_id} is not found`
                })
            }
        } catch (error: any) {
            console.log(error.message);
            res.status(500).json({
                status: 500,
                message: "Internet Services Error"
            })
        }
    }

    async getAllByProjectId(req: Request, res: Response) {
        try {
            const project = await projectService.getById(Number(req.params.project_id))
            if (project) {
                const notes = await projectNoteService.getAllByProjectId(Number(project.id));
                res.status(200).json({
                    status: 200,
                    count: notes.length,
                    project_notes: notes
                })
            } else {
                res.status(404).json({
                    status: 404,
                    result: `project number ${req.params.project_id} is not found`
                })
            }
        } catch (error: any) {
            console.log(error.message);
            res.status(500).json({
                status: 500,
                message: "Internet Services Error"
            })
        }
    }

    async deleteAll(req: Request, res: Response) {
        try {
            await projectNoteService.deleteAll();
            res.status(200).json({
                status: 200,
                message: "All project notes deleted successfully"
            })
        } catch (error: any) {
            console.log(error.message);
            res.status(500).json({
                status: 500,
                message: "Internet Services Error"
            })
        }
    }

    async deleteById(req: Request, res: Response) {
        try {
            const note = await projectNoteService.getById(Number(req.params.id));
            if (note) {
                await projectNoteService.deleteById(note.id)
                res.status(200).json({
                    status: 200,
                    result: `project note number ${req.params.id} is deleted successfully`
                })
            } else {
                res.status(404).json({
                    status: 404,
                    result: `project note number ${req.params.id} is not found`
                })
            }
        } catch (error: any) {
            console.log(error.message);
            res.status(500).json({
                status: 500,
                message: "Internet Services Error"
            })
        }
    }

    async deleteAllByVisitorId(req: Request, res: Response) {
        try {
            const visitor = await visitorService.getById(req.params.visitor_id);
            if (visitor) {
                await projectNoteService.deleteAllByVisitorId(visitor.id)
                res.status(200).json({
                    status: 200,
                    result: `project note number ${visitor.id} is deleted successfully`
                })
            } else {
                res.status(404).json({
                    status: 404,
                    result: `visitor number ${req.params.visitor_id} is not found`
                })
            }
        } catch (error: any) {
            console.log(error.message);
            res.status(500).json({
                status: 500,
                message: "Internet Services Error"
            })
        }
    }

    async deleteAllByProjectId(req: Request, res: Response) {
        try {
            const project = await projectService.getById(Number(req.params.project_id));
            if (project) {
                await projectNoteService.deleteAllByProjectId(Number(project.id))
                res.status(200).json({
                    status: 200,
                    result: `project note number ${project.id} is deleted successfully`
                })
            } else {
                res.status(404).json({
                    status: 404,
                    result: `project number ${req.params.project_id} is not found`
                })
            }
        } catch (error: any) {
            console.log(error.message);
            res.status(500).json({
                status: 500,
                message: "Internet Services Error"
            })
        }
    }

}