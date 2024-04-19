import { Request, Response } from "express";
import { CategorySkillsServices } from "../services/Category_skills.service";
import path from "path";
import { generateImagePath } from "../config/ImagePath.config";

const categorySkillsServices = new CategorySkillsServices();

export class CategorySkillsController {

    async getAll(req: Request, res: Response) {
        try {
            const category_skills = await categorySkillsServices.getAll();
            if (category_skills.length > 0) {
                res.status(200).json({
                    status: 200,
                    category_skills
                })
            } else {
                res.status(404).json({
                    status: 404,
                    category_skills: [],
                    message: "empty category skills"
                })
            }
        } catch (error) {
            res.status(500).json({
                status: 500,
                message: "something went wrong"
            })
        }
    }

    async getById(req: Request, res: Response) {
        const { id } = req.params
        try {
            const category_skills = await categorySkillsServices.getById(Number(id));
            if (category_skills) {
                res.status(200).json({
                    status: 200,
                    category_skills
                })
            } else {
                res.status(404).json({
                    status: 404,
                    category_skills: {},
                    message: `no category skills has number ${req.params.id}`
                })
            }
        } catch (error) {
            res.status(500).json({
                status: 500,
                message: "something went wrong"
            })
        }
    }

    async getByIdWithSkills(req: Request, res: Response) {
        const { id } = req.params
        try {
            const category_skills = await categorySkillsServices.getByIdWithSkills(Number(id));
            if (category_skills) {
                category_skills.skills.map((index) => {
                    index.icon = generateImagePath(index.icon)
                })
                res.status(200).json({
                    status: 200,
                    category_skills
                })
            } else {
                res.status(404).json({
                    status: 404,
                    category_skills: {},
                    message: `no category and no skills has number ${id}`
                })
            }
        } catch (error) {
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
        } catch (error) {
            res.status(500).json({
                status: 500,
                message: "something went wrong"
            })
        }
    }

    async updateById(req: Request, res: Response) {
        try {
            const category_skills = await categorySkillsServices.getById(Number(req.params.id));
            if (category_skills) {
                await categorySkillsServices.updateById(category_skills.id, req.body);
                res.status(200).json({
                    status: 200,
                    result: `Category_skills number ${req.params.id} updated successfully`
                })
            } else {
                res.status(404).json({
                    status: 404,
                    result: `Category_skills number ${req.params.id} is not found`
                })
            }
        } catch (error) {
            res.status(500).json({
                status: 500,
                message: "something went wrong"
            })
        }
    }

    async deleteById(req: Request, res: Response) {
        const { id } = req.params
        try {
            const category_skills = await categorySkillsServices.getById(Number(id));
            if (category_skills) {
                await categorySkillsServices.deleteById(category_skills.id);
                res.status(200).json({
                    status: 200,
                    result: `Category_skills number ${id} is deleted successfully`
                })
            } else {
                res.status(404).json({
                    status: 404,
                    result: `Category_skills number ${id} is not found`
                })
            }
        } catch (error) {
            res.status(500).json({
                status: 500,
                message: "something went wrong"
            })
        }
    }

    async deleteAll(req: Request, res: Response) {
        try {
            await categorySkillsServices.deleteAll();
            res.status(200).json({
                status: 200,
                result: `All category_skills deleted successfully`
            })
        } catch (error) {
            res.status(500).json({
                status: 500,
                message: "something went wrong"
            })
        }
    }
}