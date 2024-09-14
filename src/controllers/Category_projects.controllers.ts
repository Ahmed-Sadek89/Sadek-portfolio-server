import { Request, Response } from "express";
import { CategoryProjectsServices } from "../services/Category_projects.service";

const categoryProjectsServices = new CategoryProjectsServices();

export class CategoryProjectsController {

    async all(req: Request, res: Response) {
        try {
            const category_projects = await categoryProjectsServices.getAll(Number(req.query.awner_id));
            res.status(200).json({
                status: 200,
                category_projects
            })
        } catch (error: any) {
            console.log(error.message)
            res.status(500).json({
                status: 500,
                message: "Enternet services error"
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
            if (error.code === 'P2002') {
                res.status(409).json({
                    status: 409,
                    message: 'This category projects is already exists.',
                });
            } else {
                res.status(500).json({
                    status: 200,
                    message: "something went wrong",
                });
            }
        }
    }

    async updateById(req: Request, res: Response) {
        try {

            await categoryProjectsServices.updateById(req.body, Number(req.params.id))
            res.status(200).json({
                status: 200,
                result: `Category_projects number ${Number(req.params.id)} updated successfully`
            })

        } catch (error: any) {
            console.log(error.message)
            if (error.code === 'P2002') {
                res.status(409).json({
                    status: 409,
                    message: 'This category projects is already exists.',
                });
            } else {
                res.status(500).json({
                    status: 200,
                    message: "something went wrong",
                });
            }
        }
    }

    async deleteById(req: Request, res: Response) {
        try {
            await categoryProjectsServices.deleteById(Number(req.params.id), Number(req.body.awner_id));
            res.status(200).json({
                status: 200,
                result: `category_project number ${Number(req.params.id)} is deleted successfully`
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