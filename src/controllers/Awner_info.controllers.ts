import { Request, Response } from "express";
import { AwnerInfoService } from "../services/Awner_info.service";
import dotenv from 'dotenv';


const awnerInfoService = new AwnerInfoService();

export class AwnerInfoController {
    constructor() {
        dotenv.config()
    }
    async getAwnerInfo(req: Request, res: Response) {
        try {
            const awner_info = await awnerInfoService.getAwnerInfo();
            const imagePath = awner_info ? `${process.env.BACKEND_LINK}/uploads/${awner_info?.image}` : ""
            res.status(200).json({
                status: 200,
                awner_info: {
                    ...awner_info,
                    image: imagePath
                }
            })
        } catch (error) {
            res.status(500).json({
                status: 500,
                message: "something went wrong!"
            })
        }
    }

    async insertAwnerInfo(req: Request, res: Response) {
        try {
            const awner_info = await awnerInfoService.getAwnerInfo();
            if (awner_info) {
                res.status(401).json({
                    status: 401,
                    message: "you have already your awner info"
                })
            } else {
                const image = req.file?.filename;
                await awnerInfoService.insertAwnerInfo({ ...req.body, image })
                res.status(200).json({
                    status: 200,
                    message: "your awner info is added successfully"
                })
            }
        } catch (error: any) {
            console.log(error.message)
            res.status(500).json({
                status: 500,
                message: "something went wrong!"
            })
        }
    }

    async updateAwnerInfo(req: Request, res: Response) {
        try {
            const image = req.file?.filename;
            await awnerInfoService.updateAwnerInfo({ ...req.body, image });
            res.status(200).json({
                status: 200,
                message: "Awner_info is updated successfully"
            })
        } catch (error: any) {
            console.log(error.message)
            res.status(500).json({
                status: 500,
                message: "something went wrong!"
            })
        }
    }
}