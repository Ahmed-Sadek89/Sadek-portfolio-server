import { Request, Response } from "express";
import { LinkTypeService } from "../services/link_type.service";


const linkTypeServices = new LinkTypeService();

export class LinkTypeController {

    async getAllByAwnerId(req: Request, res: Response) {
        const { awner_id } = req.params;
        try {
            const linkType = await linkTypeServices.getAllByAwnerId(Number(awner_id));
            res.status(200).json({
                status: 200,
                linkType
            })
        } catch (error: any) {
            console.log(error.message)
            res.status(500).json({
                status: 500,
                message: "something went wrong"
            })
        }
    }

    async insertLinkType(req: Request, res: Response) {
        try {
            await linkTypeServices.insertLinkType(req.body)
            res.status(200).json({
                status: 200,
                message: "new link type inserted successfully"
            })
        } catch (error: any) {
            console.log({ error: error.message })
            if (error.code === 'P2002') {
                res.status(409).json({
                    status: 409,
                    message: 'This link type is already exists.',
                });
            } else {
                res.status(500).json({
                    status: 200,
                    message: "something went wrong",
                });
            }
        }
    }

    async updateLinkType(req: Request, res: Response) {
        const { id } = req.params
        try {
            await linkTypeServices.updatelinkType(Number(id), req.body)
            res.status(200).json({
                status: 200,
                message: `the link type ${id} updated successfully`
            })
        } catch (error: any) {
            console.log({ error: error.message })
            if (error.code === 'P2025') { // Prisma error for "Record to update does not exist"
                res.status(404).json({
                    status: 404,
                    message: `Link type ${id} is not found`,
                });
            } else if (error.code === 'P2002') { // Prisma error code for unique constraint violation
                res.status(409).json({
                    status: 409,
                    message: 'This link type already exists.',
                });
            } else {
                res.status(500).json({
                    status: 500,
                    message: 'Internal server error',
                });
            }
        }
    }

    async deleteById(req: Request, res: Response) {
        const { id } = req.params
        const awner_id = Number(req.body.awner_id)
        try {
            await linkTypeServices.deleteById(Number(id), awner_id)
            res.status(200).json({
                status: 200,
                message: `The link type ${id} deleted successfully`
            })
        } catch (error: any) {
            console.log({ error: error.message })
            if (error.code === 'P2025') {  // P2025 is the Prisma error code for "Record to delete does not exist."
                res.status(404).json({
                    status: 404,
                    message: `The link type ${id} is not found`,
                });
            } else {
                res.status(500).json({
                    status: 500,
                    message: 'Internal server error',
                });
            }
        }
    }

}