import { Request, Response } from "express";
import { SkillsServices } from "../services/Skills.service";
import { CategorySkillsServices } from "../services/Category_skills.service";
import { generateImagePath } from "../config/ImagePath.config";

const skillsServices = new SkillsServices();
const categoryskillsServices = new CategorySkillsServices()

export class SkillsController {

    async getById(req: Request, res: Response) {
        try {
            const skill = await skillsServices.getById(Number(req.params.id));
            if (skill) {
                const iconPath = generateImagePath(skill.icon)
                res.status(200).json({
                    status: 200,
                    skill: {
                        ...skill,
                        icon: iconPath
                    }
                })
            } else {
                res.status(404).json({
                    status: 404,
                    skill: null
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
            const icon = req.file?.filename
            await skillsServices.insert({...req.body, icon});
            res.status(200).json({
                status: 200,
                result: `new skill added successfully`
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
            const skill = await skillsServices.getById(Number(req.params.id));
            if (skill) {
                const icon = req.file?.filename
                await skillsServices.updateById(skill.id, {...req.body, icon})
                res.status(200).json({
                    status: 200,
                    result: `skill number ${req.params.id} is updated successfully`
                })
            } else {
                res.status(404).json({
                    status: 404,
                    skill: `skill number ${req.params.id} is not found`
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
        try {
            const skill = await skillsServices.getById(Number(req.params.id));
            if (skill) {
                await skillsServices.deleteById(skill.id)
                res.status(200).json({
                    status: 200,
                    result: `skill number ${req.params.id} is deleted successfully`
                })
            } else {
                res.status(404).json({
                    status: 404,
                    skill: `skill number ${req.params.id} is not found`
                })
            }
        } catch (error) {
            res.status(500).json({
                status: 500,
                message: "something went wrong"
            })
        }
    }

    async deleteByCategoryId(req: Request, res: Response) {
        try {
            const categoryskills = await categoryskillsServices.getById(Number(req.params.category_id));
            if (categoryskills) {
                await skillsServices.deleteByCategoryId(categoryskills.id)
                res.status(200).json({
                    status: 200,
                    result: `all skills related to category number ${req.params.category_id} is deleted successfully`
                })
            } else {
                res.status(404).json({
                    status: 404,
                    skill: `category number ${req.params.category_id} is not found`
                })
            }
        } catch (error) {
            res.status(500).json({
                status: 500,
                message: "something went wrong"
            })
        }
    }
}