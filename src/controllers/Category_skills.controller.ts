import { Request, Response } from "express";
import { CategorySkillsServices } from "../services/Category_skills.service";

const categorySkillsServices = new CategorySkillsServices();

export class CategorySkillsController {

    async getAll(req: Request, res: Response) {
        const { awner_id } = req.query
        try {
            const category_skills = await categorySkillsServices.getAll(Number(awner_id));
            res.status(200).json({
                status: 200,
                category_skills
            })
        } catch (error: any) {
            console.log({ error: error.message })
            res.status(500).json({
                status: 500,
                message: "something went wrong"
            })
        }
    }

    async insert(req: Request, res: Response) {
        try {
            await categorySkillsServices.insert(req.body);
            res.status(200).json({
                status: 200,
                result: "new category_skills created successfully"
            })
        } catch (error: any) {
            console.log({ error: error.message })
            if (error.code === 'P2002') {
                res.status(409).json({
                    status: 409,
                    message: 'This category skill is already exists.',
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
        const { id } = req.params
        try {
            await categorySkillsServices.updateById(Number(id), req.body);
            res.status(200).json({
                status: 200,
                result: `Category_skills number ${id} updated successfully`
            })

        } catch (error: any) {
            console.log({ error: error.message })
            console.log({ error: error.message })
            if (error.code === 'P2002') {
                res.status(409).json({
                    status: 409,
                    message: 'This category skill is already exists.',
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
        const { id } = req.params;
        const { awner_id } = req.body
        try {
            await categorySkillsServices.deleteById(Number(id), Number(awner_id));
            res.status(200).json({
                status: 200,
                result: `Category_skills number ${id} is deleted successfully`
            })

        } catch (error) {
            res.status(500).json({
                status: 500,
                message: "something went wrong"
            })
        }
    }
}