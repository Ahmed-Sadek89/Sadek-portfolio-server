import { Request, Response } from "express";
import { SkillsServices } from "../services/Skills.service";
import { removeFromCloudinary, uploadToCloudinary } from "../config/cloudinaryFunctions.config";

const skillsServices = new SkillsServices();

export class SkillsController {

    private async getUploadedIcon(req: Request, existedIcon: string): Promise<{ secure_url: string; }> {
        let uploadedImage
        if (req.file && req.file.size !== 0) {
            uploadedImage = await uploadToCloudinary(req.file?.path)
        } else {
            uploadedImage = { secure_url: existedIcon }
        }
        return uploadedImage
    }

    async getByAwnerId(req: Request, res: Response) {
        try {
            const skills = await skillsServices.getByAwnerId(Number(req.params.awner_id));
            const modifiedSkills = skillsServices.getModifiedSkills(skills)
            res.status(200).json({
                status: 200,
                skills: modifiedSkills
            })
        } catch (error: any) {
            console.log(error.message)
            res.status(500).json({
                status: 500,
                message: "something went wrong"
            })
        }
    }

    async getByCategoryId(req: Request, res: Response) {
        try {
            const skills = await skillsServices.getByCategoryId(Number(req.params.category_id));
            const modifiedSkills = skillsServices.getModifiedSkills(skills)
            res.status(200).json({
                status: 200,
                skills: modifiedSkills
            })

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
            await skillsServices.insert({
                ...req.body,
                icon: uploadedImage.secure_url,
                awner_id,
                category_id
            });
            res.status(200).json({
                status: 200,
                result: `new skill added successfully`
            })

        } catch (error: any) {
            console.log(error.message)
            console.log({ error: error.message })
            if (error.code === 'P2002') {
                res.status(409).json({
                    status: 409,
                    message: 'This skill is already exists.',
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
        let { existedIcon, ...body } = req.body
        const awner_id = Number(body.awner_id)
        const category_id = Number(body.category_id)
        const id = Number(req.params.id)
        try {
            let uploadedImage = await this.getUploadedIcon(req, existedIcon)

            await skillsServices.updateById(id, { ...body, icon: uploadedImage.secure_url, awner_id, category_id })
            res.status(200).json({
                status: 200,
                result: `skill number ${req.params.id} is updated successfully`
            })
        }
        catch (error: any) {
            console.log({ error: error.message })
            if (error.code === 'P2002') {
                res.status(409).json({
                    status: 409,
                    message: 'This skill is already exists.',
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
            const skill = await skillsServices.getById(Number(req.params.id));
            if (skill) {
                await removeFromCloudinary(skill.icon as string)
                await skillsServices.deleteById(skill.id, Number(req.body.awner_id))
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

}