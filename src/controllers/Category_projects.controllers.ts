import { Request, Response } from "express";
import { CategoryProjectsServices } from "../services/Category_projects.service";

const categoryProjectsServices = new CategoryProjectsServices();

export class CategoryProjectsController {

    async getAll(req: Request, res: Response) {
        try {
            const category_projects = await categoryProjectsServices.getAll();
            if (category_projects.length > 0) {
                res.status(200).json({
                    status: 200,
                    count: category_projects.length,
                    category_projects
                })
            } else {
                res.status(404).json({
                    status: 404,
                    category_projects: []
                })
            }
        } catch (error: any) {
            console.log(error.message)
            res.status(500).json({
                status: 500,
                message: "Enternet services error"
            })
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const category_project = await categoryProjectsServices.getById(Number(req.params.id))
            if (category_project) {
                res.status(200).json({
                    status: 200,
                    category_project
                })
            } else {
                res.status(404).json({
                    status: 404,
                    category_project: {}
                })
            }
        } catch (error: any) {
            console.log(error.message)
            res.status(500).json({
                status: 500,
                message: "Enternet Services Error"
            })
        }
    }

    async getWithProjects(req: Request, res: Response) {
        try {
            const category_project = await categoryProjectsServices.getById(Number(req.params.id))
            if (category_project) {
                const projectsByCategory = await categoryProjectsServices.getWithProjects(category_project.id)
                res.status(200).json({
                    status: 200,
                    projectsByCategory
                })
            } else {
                res.status(404).json({
                    status: 404,
                    category_project: {}
                })
            }
        } catch (error: any) {
            console.log(error.message)
            res.status(500).json({
                status: 500,
                message: "Enternet Services Error"
            })
        }
    }

    async insert(req: Request, res: Response) {
        try {
            await categoryProjectsServices.insert(req.body)
            res.status(200).json({
                status: 200,
                result: "new category_projects created successfully"
            })
        } catch (error: any) {
            console.log(error.message)
            res.status(500).json({
                status: 500,
                message: "Enternet Services Error"
            })
        }
    }

    async updateById(req: Request, res: Response) {
        try {
            const category_project = await categoryProjectsServices.getById(Number(req.params.id))
            if (category_project) {
                await categoryProjectsServices.updateById(req.body, category_project.id)
                res.status(200).json({
                    status: 200,
                    result: `Category_projects number ${category_project.id} updated successfully`
                })
            } else {
                res.status(404).json({
                    status: 404,
                    result: `Category_projects number ${req.params.id} is not found`
                })
            }
        } catch (error: any) {
            console.log(error.message)
            res.status(500).json({
                status: 500,
                message: "Enternet Services Error"
            })
        }
    }

    async deleteById(req: Request, res: Response) {
        try {
            const category_project = await categoryProjectsServices.getById(Number(req.params.id));
            if (category_project) {
                await categoryProjectsServices.deleteById(category_project.id);
                res.status(200).json({
                    status: 200,
                    result: `category_project number ${category_project.id} is deleted successfully`
                })
            } else {
                res.status(404).json({
                    status: 404,
                    result: `category_project number ${req.params.id} is not found`
                })
            }
        } catch (error: any) {
            console.log(error.message)
            res.status(500).json({
                status: 500,
                message: "Enternet Services Error"
            })
        }
    }

    async deleteAll(req: Request, res: Response) {
        try {
            await categoryProjectsServices.deleteAll();
            res.status(200).json({
                status: 200,
                result: `All category_project deleted successfully`
            })
        } catch (error: any) {
            console.log(error.message)
            res.status(500).json({
                status: 500,
                message: "Enternet Services Error"
            })
        }
    }

}