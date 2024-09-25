import { Request, Response } from "express";
import { removeFromCloudinary, uploadToCloudinary } from "../config/cloudinaryFunctions.config";
import { ProjectServices } from "../services/Projects.service";


const projectServices = new ProjectServices();

export class ProjectController {


    async all(req: Request, res: Response) {
        try {
            const projects = await projectServices.all(Number(req.query.awner_id))
            res.status(200).json({
                status: 200,
                projects
            })

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

    async getByCategoryProjectId(req: Request, res: Response) {
        try {
            const projects = await projectServices.getByCategoryProjectId(Number(req.params.category_project_id))
            res.status(200).json({
                status: 200,
                count: projects.length,
                projects
            })

        } catch (error: any) {
            console.log(error.message)
            res.status(500).json({
                status: 500,
                message: "something went wrong"
            })
        }
    }

    async getByCategorySkillId(req: Request, res: Response) {
        try {
            const projects = await projectServices.getByCategorySkillId(Number(req.params.category_skill_id))
            res.status(200).json({
                status: 200,
                count: projects.length,
                projects
            })

        } catch (error: any) {
            console.log(error.message)
            res.status(500).json({
                status: 500,
                message: "something went wrong"
            })
        }
    }

    async getBySkillId(req: Request, res: Response) {
        try {
            const projects = await projectServices.getBySkillId(Number(req.params.skill_id))
            res.status(200).json({
                status: 200,
                count: projects.length,
                projects
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
        const projectBody = {
            awner_id: Number(req.body.awner_id),
            title: req.body.title_desktop ? req.body.title_desktop : req.body.title_mobile,
            description: req.body.description,
            status: req.body.status,
            created_at: req.body.created_at,
            ended_at: req.body.ended_at,
            category_project_id: Number(req.body.category_project_id),
            live_url: req.body.live_url,
            repo_url: req.body.repo_url,
        }
        const category_skills_ids = req.body.category_skills_id.toString().split(",");
        const skills_ids = req.body.skills_id.toString().split(",");
        // console.log({ ...projectBody, category_skills_id, skills_id })
        // console.log({ file: req.file })
        try {
            if (!req.file) {
                throw new Error("Path not found")
            }
            const uploadedImage = await uploadToCloudinary(req.file?.path)
            await projectServices.insert(
                {
                    ...projectBody,
                    attachment: uploadedImage.secure_url,
                },
                category_skills_ids,
                skills_ids
            );
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
                await removeFromCloudinary(project.attachment as string)
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
        // try {
        //     const projectsByCategoryId = await categoryprojectsServices.getWithProjects(Number(req.params.categoryId));
        //     if (projectsByCategoryId) {
        //         projectsByCategoryId.Project.map(index => {
        //             return removeFromCloudinary(index.attachment as string)
        //         })
        //         await projectServices.deleteAllByCategoryId(projectsByCategoryId.id);
        //         res.status(200).json({
        //             status: 200,
        //             result: `all projects with category number ${req.params.categoryId} is deleted successfully`
        //         })
        //     } else {
        //         res.status(404).json({
        //             status: 404,
        //             result: `category number ${req.params.categoryId} is not found`
        //         })
        //     }
        // } catch (error: any) {
        //     console.log(error.message)
        //     res.status(500).json({
        //         status: 500,
        //         message: "something went wrong"
        //     })
        // }
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