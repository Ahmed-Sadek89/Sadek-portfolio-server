import { Request, Response } from "express";
import { MessageService } from "../services/Messages.service";
import { VisitorService } from "../services/Visitor.service";

const messageService = new MessageService();
const visitorService = new VisitorService();

export class MessageController {

    async getAll(req: Request, res: Response) {
        try {
            const messages = await messageService.getAll();
            if (messages.length > 0) {
                res.status(200).json({
                    status: 200,
                    count: messages.length,
                    messages
                })
            } else {
                res.status(404).json({
                    status: 404,
                    messages: []
                })
            }
        } catch (error: any) {
            console.log(error.message);
            res.status(500).json({
                status: 500,
                message: "Internet Services Error"
            })
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const message = await messageService.getById(Number(req.params.id));
            if (message) {
                res.status(200).json({
                    status: 200,
                    message
                })
            } else {
                res.status(404).json({
                    status: 404,
                    message: {}
                })
            }
        } catch (error: any) {
            console.log(error.message);
            res.status(500).json({
                status: 500,
                message: "Internet Services Error"
            })
        }
    }

    async getAllByVisitorId(req: Request, res: Response) {
        try {
            const messages = await messageService.getAllByVisitorId(req.params.visitor_id);
            if (messages.length > 0) {
                res.status(200).json({
                    status: 200,
                    count: messages.length,
                    messages
                })
            } else {
                res.status(404).json({
                    status: 404,
                    message: []
                })
            }
        } catch (error: any) {
            console.log(error.message);
            res.status(500).json({
                status: 500,
                message: "Internet Services Error"
            })
        }
    }

    async insert(req: Request, res: Response) {
        try {
            await messageService.insert(req.body)
            res.status(200).json({
                status: 200,
                result: "new message inserted successfully"
            })
        } catch (error: any) {
            console.log(error.message);
            res.status(500).json({
                status: 500,
                message: "Internet Services Error"
            })
        }
    }

    async deleteAll(req: Request, res: Response) {
        try {
            await messageService.deleteAll()
            res.status(200).json({
                status: 200,
                result: "all messages deleted successfully"
            })
        } catch (error: any) {
            console.log(error.message);
            res.status(500).json({
                status: 500,
                message: "Internet Services Error"
            })
        }
    }

    async deleteAllByVisitorId(req: Request, res: Response) {
        try {
            const visitor = await visitorService.getById(req.params.visitor_id)
            if (visitor) {
                await messageService.deleteByVisitorId(visitor.id)
                res.status(200).json({
                    status: 200,
                    result: `all messages related to visitor number ${visitor.id} are deleted successfully`
                })
            } else {
                res.status(404).json({
                    status: 404,
                    result: `visitor number ${req.params.visitor_id} is not found`
                })
            }
        } catch (error: any) {
            console.log(error.message);
            res.status(500).json({
                status: 500,
                message: "Internet Services Error"
            })
        }
    }

    async deleteById(req: Request, res: Response) {
        try {
            const message = await messageService.getById(Number(req.params.id))
            if (message) {
                await messageService.deleteById(message.id)
                res.status(200).json({
                    status: 200,
                    result: `message number ${message.id} is deleted successfully`
                })
            } else {
                res.status(404).json({
                    status: 404,
                    result: `message number ${req.params.visitor_id} is not found`
                })
            }
        } catch (error: any) {
            console.log(error.message);
            res.status(500).json({
                status: 500,
                message: "Internet Services Error"
            })
        }
    }

}