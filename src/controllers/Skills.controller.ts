import { Request, Response } from "express";
import { SkillsServices } from "../services/Skills.service";
import { CategorySkillsServices } from "../services/Category_skills.service";
import { removeFromCloudinary, uploadToCloudinary } from "../config/cloudinaryFunctions.config";

const skillsServices = new SkillsServices();
const categoryskillsServices = new CategorySkillsServices()

export class SkillsController {

    async getById(req: Request, res: Response) {
        try {
            const skill = await skillsServices.getById(Number(req.params.id));
            if (skill) {
                res.status(200).json({
                    status: 200,
                    skill
                })
            } else {
                res.status(404).json({
                    status: 404,
                    skill: null
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
        const category_id = Number(req.body.category_id);
        const awner_id = Number(req.body.awner_id);
        try {
            if (!req.file) {
                throw new Error("path not found")
            }
            const uploadedImage = await uploadToCloudinary(req.file?.path)
            await skillsServices.insert({ ...req.body, icon: uploadedImage.secure_url, awner_id, category_id});
            res.status(200).json({
                status: 200,
                result: `new skill added successfully`
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
        const category_id = Number(req.body.category_id);
        const awner_id = Number(req.body.awner_id);

        try {
            const skill = await skillsServices.getById(Number(req.params.id));
            if (skill) {
                if (!req.file) {
                    throw new Error("path not found")
                }
                const uploadedImage = await uploadToCloudinary(req.file?.path)
                await skillsServices.updateById(skill.id, { ...req.body, icon: uploadedImage.secure_url, awner_id, category_id})
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
            const skill = await skillsServices.getById(Number(req.params.id));
            if (skill) {
                await removeFromCloudinary(skill.icon as string)
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
            const categoryskills = await categoryskillsServices.getByIdWithSkills(Number(req.params.category_id));
            if (categoryskills) {
                categoryskills.Skill.map(index => {
                    return removeFromCloudinary(index.icon as string)
                })
                await skillsServices.deleteByCategoryId(Number(categoryskills.id))
                res.status(200).json({
                    status: 200,
                    result: `all skills related to category number ${categoryskills.id} is deleted successfully`
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