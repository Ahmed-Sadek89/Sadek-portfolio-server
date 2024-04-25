import { VisitorService } from "../services/Visitor.service";
import { OAuthController } from "./OAuth.controllers";
import { Request, Response } from 'express';

const visitorServices = new VisitorService()

export class VisitorController extends OAuthController {

    async getById(req: Request, res: Response) {
        try {
            const visitor = await visitorServices.getById(req.params.id);
            if (visitor) {
                res.status(200).json({
                    status: 200,
                    visitor
                })
            } else {
                res.status(404).json({
                    status: 404,
                    visitor: {}
                })
            }
        } catch (error: any) {
            console.log(error.message)
            res.status(500).json({
                status: 500,
                message: "Internet Services Error"
            })
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const visitors = await visitorServices.getAll();
            if (visitors.length > 0) {
                res.status(200).json({
                    status: 200,
                    visitors
                })
            } else {
                res.status(404).json({
                    status: 404,
                    visitors: []
                })
            }
        } catch (error: any) {
            console.log(error.message)
            res.status(500).json({
                status: 500,
                message: "Internet Services Error"
            })
        }
    }

    async deleteById(req: Request, res: Response) {
        try {
            const visitor = await visitorServices.getById(req.params.id);
            if (visitor) {
                await visitorServices.deleteById(visitor.id)
                res.status(200).json({
                    status: 200,
                    result: `visitor number ${visitor.id} is deleted successfully`
                })
            } else {
                res.status(404).json({
                    status: 404,
                    result: `visitor number ${req.params.id} is not found`
                })
            }
        } catch (error: any) {
            console.log(error.message)
            res.status(500).json({
                status: 500,
                message: "Internet Services Error"
            })
        }
    }

    async deleteAll(req: Request, res: Response) {
        try {
            await visitorServices.deleteAll()
            res.status(200).json({
                status: 200,
                result: `All visitors are deleted successfully`
            })
        } catch (error: any) {
            console.log(error.message)
            res.status(500).json({
                status: 500,
                message: "Internet Services Error"
            })
        }
    }

    async getMessagesByVisitorId(req: Request, res: Response) {
        try {
            const visitor = await visitorServices.getById(req.params.id);
            if (visitor) {
                const messagesByVisitorId = await visitorServices.getMessagesByVisitorId(visitor.id)
                res.status(200).json({
                    status: 200,
                    result: messagesByVisitorId
                })
            } else {
                res.status(404).json({
                    status: 404,
                    result: `visitor number ${req.params.id} is not found`
                })
            }
        } catch (error: any) {
            console.log(error.message)
            res.status(500).json({
                status: 500,
                message: "Internet Services Error"
            })
        }
    }

    async getnotesByVisitorId(req: Request, res: Response) {
        try {
            const visitor = await visitorServices.getById(req.params.id);
            if (visitor) {
                const notesByVisitorId = await visitorServices.getNotesByVisitorId(visitor.id)
                res.status(200).json({
                    status: 200,
                    result: notesByVisitorId
                })
            } else {
                res.status(404).json({
                    status: 404,
                    result: `visitor number ${req.params.id} is not found`
                })
            }
        } catch (error: any) {
            console.log(error.message)
            res.status(500).json({
                status: 500,
                message: "Internet Services Error"
            })
        }
    }

}