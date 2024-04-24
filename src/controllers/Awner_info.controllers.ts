import { Request, Response } from "express";
import { AwnerInfoService } from "../services/Awner_info.service";
import { uploadToCloudinary } from "../config/cloudinaryFunctions.config";

const awnerInfoService = new AwnerInfoService();


export class AwnerInfoController {

    async getAwnerInfo(req: Request, res: Response) {
        try {
            const awner_info = await awnerInfoService.getAwnerInfo();

            res.status(200).json({
                status: 200,
                awner_info: awner_info && {
                    ...awner_info,
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
                if (!req.file) {
                    throw new Error('No file uploaded');
                }
                const uploadedImageToCloudiary = await uploadToCloudinary(req.file.path)
                await awnerInfoService.insertAwnerInfo({
                    ...req.body,
                    image: uploadedImageToCloudiary.secure_url
                })
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
            if (!req.file) {
                throw new Error('No file uploaded');
            }
            const uploadedImageToCloudiary = await uploadToCloudinary(req.file.path)
            await awnerInfoService.updateAwnerInfo({ ...req.body, image: uploadedImageToCloudiary.secure_url });
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