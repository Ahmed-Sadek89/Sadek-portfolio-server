import { Request, Response } from "express";
import { CategorySkillsServices } from "../services/Category_skills.service";

const categorySkillsServices = new CategorySkillsServices();

export class CategorySkillsController {

    async getAll(req: Request, res: Response) {
        try {
            const category_skills = await categorySkillsServices.getAll();
            res.status(200).json({
                status: 200,
                category_skills
            })
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
            res.status(200).json({
                status: 200,
                category_skills
            })
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
            res.status(200).json({
                status: 200,
                category_skills
            })
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
            await categorySkillsServices.updateById(Number(req.params.id), req.body);
            res.status(200).json({
                status: 200,
                result: `Category_skills number ${req.params.id} updated successfully`
            })
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
            await categorySkillsServices.deleteById(Number(id));
            res.status(200).json({
                status: 200,
                result: `Category_skills number ${id} deleted successfully`
            })
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