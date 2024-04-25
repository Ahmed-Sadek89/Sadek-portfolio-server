import { Request, Response } from "express";
import { removeFromCloudinary, uploadToCloudinary } from "../config/cloudinaryFunctions.config";
import { CategoryProjectsServices } from "../services/Category_projects.service";
import { ProjectServices } from "../services/Projects.service";


const projectServices = new ProjectServices();
const categoryprojectsServices = new CategoryProjectsServices()

export class ProjectController {


    async getAll(req: Request, res: Response) {
        try {
            const projects = await projectServices.getAll()
            if (projects.length > 0) {
                res.status(200).json({
                    status: 200,
                    count: projects.length,
                    projects
                })
            } else {
                
                res.status(404).json({
                    status: 404,
                    projects: [],
                    message: "No projects!"
                })
            }
        } catch (error: any) {
            console.log(error.message)
            res.status(500).json({
                status: 500,
                message: "something went wrong"
            })
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const project = await projectServices.getById(Number(req.params.id));
            if (project) {
                res.status(200).json({
                    status: 200,
                    project
                })
            } else {
                res.status(404).json({
                    status: 404,
                    project: {},
                    message: `project number ${req.params.id} is not found`
                })
            }
        } catch (error: any) {
            console.log(error.message)
            res.status(500).json({
                status: 500,
                message: "something went wrong"
            })
        }
    }

    async insert(req: Request, res: Response) {
        try {
            if (!req.file) {
                throw new Error("Path not found")
            }
            const uploadedImage = await uploadToCloudinary(req.file?.path)
            await projectServices.insert({
                ...req.body,
                attachment: uploadedImage.secure_url,
                category_project_id: Number(req.body.category_project_id)
            });
            res.status(200).json({
                status: 200,
                result: "new project is created successfully"
            })
        } catch (error: any) {
            console.log(error.message)
            res.status(500).json({
                status: 500,
                message: "something went wrong"
            })
        }
    }

    async updateById(req: Request, res: Response) {
        try {
            const project = await projectServices.getById(Number(req.params.id));
            if (project) {
                if (!req.file) {
                    throw new Error("path not found")
                }
                const uploadedImage = await uploadToCloudinary(req.file.path)
                await projectServices.updateById(project.id, {
                    ...req.body,
                    attachment: uploadedImage.secure_url,
                    category_project_id: Number(req.body.category_project_id)
                });
                res.status(200).json({
                    status: 200,
                    result: `project number ${project.id} updated successfully`
                })
            } else {
                res.status(404).json({
                    status: 404,
                    result: `project number ${req.params.id} is not found`
                })
            }
        } catch (error: any) {
            console.log(error.message)
            res.status(500).json({
                status: 500,
                message: "something went wrong"
            })
        }
    }

    async deleteById(req: Request, res: Response) {
        try {
            const project = await projectServices.getById(Number(req.params.id));
            if (project) {
                await removeFromCloudinary(project.attachment)
                await projectServices.deleteById(project.id);
                res.status(200).json({
                    status: 200,
                    result: `project number ${project.id} is deleted successfully`
                })
            } else {
                res.status(404).json({
                    status: 404,
                    result: `project number ${req.params.id} is not found`
                })
            }
        } catch (error: any) {
            console.log(error.message)
            res.status(500).json({
                status: 500,
                message: "something went wrong"
            })
        }
    }


    // join
    async deleteAllByCategoryId(req: Request, res: Response) {
        try {
            const projectsByCategoryId = await categoryprojectsServices.getWithProjects(Number(req.params.categoryId));
            if (projectsByCategoryId) {
                projectsByCategoryId.projects.map(index => {
                    return removeFromCloudinary(index.attachment)
                })
                await projectServices.deleteAllByCategoryId(projectsByCategoryId.id)
                res.status(200).json({
                    status: 200,
                    result: `all projects with category number ${req.params.categoryId} is deleted successfully`
                })
            } else {
                res.status(404).json({
                    status: 404,
                    result: `category number ${req.params.categoryId} is not found`
                })
            }
        } catch (error: any) {
            console.log(error.message)
            res.status(500).json({
                status: 500,
                message: "something went wrong"
            })
        }
    }

    async getProjectNotesByProjectId(req: Request, res: Response) {
        try {
            const project = await projectServices.getById(Number(req.params.id))
            if (project) {
                const notesByProject = await projectServices.getProjectNotesByProjectId(project.id)
                res.status(200).json({
                    status: 200,
                    notesByProject
                })
            } else {
                res.status(404).json({
                    status: 404,
                    result: `project number ${req.params.id} is not found`
                })
            }
        } catch (error: any) {
            console.log(error.message)
            res.status(500).json({
                status: 500,
                message: "something went wrong"
            })
        }
    }
}