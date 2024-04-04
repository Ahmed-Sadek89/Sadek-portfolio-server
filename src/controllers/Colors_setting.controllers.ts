import { Request, Response } from "express";
import { ColorSettingServices } from "../services/ColorSetting.service";

const colorSettingServices = new ColorSettingServices();

export class ColorSettingController {

    async getColorSetting(req: Request, res: Response) {
        try {
            const colorSetting = await colorSettingServices.getColorSetting();
            res.status(200).json({
                status: 200,
                colorSetting
            })
        } catch (error) {
            res.status(500).json({
                status: 500,
                message: "something went wrong!"
            })
        }
    }

    async insertColorSetting(req: Request, res: Response) {
        try {
            const colorSetting = await colorSettingServices.getColorSetting();
            if (colorSetting) {
                res.status(401).json({
                    status: 401,
                    message: "you have already your color setting"
                })
            } else {
                await colorSettingServices.insertColorSetting(req.body)
                res.status(200).json({
                    status: 200,
                    message: "your color setting is added successfully"
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

    async updateColorSetting(req: Request, res: Response) {
        try {
            await colorSettingServices.updateColorSetting(req.body);
            res.status(200).json({
                status: 200,
                message: "colors setting is updated successfully"
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