import { Request, Response } from "express";
import { JobTitlesServices } from "../services/Job_titles.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const jobTitleServices = new JobTitlesServices();

export class JobTitlesController {

    async getAll(req: Request, res: Response) {
        const { awner_id } = req.params
        try {
            const job_titles = await jobTitleServices.getAll(Number(awner_id));
            res.status(200).json({
                status: 200,
                job_titles
            })
        } catch (error: any) {
            console.log({ error: error.message })

            res.status(500).json({
                status: 200,
                message: "something went wrong",
            });
        }
    }

    async insertNewJobTitle(req: Request, res: Response) {
        try {
            await jobTitleServices.insertNewJobTitle(req.body)
            res.status(200).json({
                status: 200,
                message: "new job title inserted successfully"
            })
        } catch (error: any) {
            console.log({ error: error.message, code: error.code })
            if (error.code === 'P2002') { // Prisma error code for unique constraint violation
                res.status(409).json({
                    status: 409,
                    message: 'This job title already exists for this awner.',
                });
            } else {
                res.status(500).json({
                    status: 500,
                    message: "something went wrong",
                });
            }
        }
    }

    async updateJobTitle(req: Request, res: Response) {
        try {
            const { id } = req.params
            await jobTitleServices.updateJobTitle(Number(id), req.body)
            res.status(200).json({
                status: 200,
                message: `the job title number ${id} updated successfully`
            })
        } catch (error: any) {
            console.log({ error: error.message })
            if (error.code === 'P2002') { // Prisma error code for unique constraint violation
                res.status(409).json({
                    status: 409,
                    message: 'This job title already exists for this awner.',
                });
            } else {
                res.status(500).json({
                    status: 500,
                    message: "something went wrong",
                });
            }
        }
    }

    async deleteById(req: Request, res: Response) {
        const { id } = req.params
        const { awner_id } = req.body
        try {
            await jobTitleServices.deleteById(Number(id), Number(awner_id))
            res.status(200).json({
                status: 200,
                message: `the job title number ${id} deleted successfully`
            })
        } catch (error: any) {
            res.status(500).json({
                status: 500,
                message: "something went wrong"
            })
        }
    }

    async deleteAll(req: Request, res: Response) {
        try {
            await jobTitleServices.deleteAll()
            res.status(200).json({
                status: 200,
                message: `all job titles are deleted`
            })
        } catch (error: any) {
            res.status(500).json({
                status: 500,
                message: "something went wrong"
            })
        }
    }
}