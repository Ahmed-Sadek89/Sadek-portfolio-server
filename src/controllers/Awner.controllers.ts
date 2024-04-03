import { Request, Response } from "express";
import { findAllAwnersService, findAwnerById, postAwnerService } from "../services/Awner.service";

export const postAwnerController = async (req: Request, res: Response) => {
    try {
        await postAwnerService(req.body)
        res.status(200).json({
            status: 200,
            result: "new awner inserted successfully"
        })
    } catch (error: any) {
        res.status(500).json({
            status: 500,
            message: "something went wrong!"
        })
    }

}

export const getAllAwners = async (_: Request, res: Response) => {
    try {
        const awners = await findAllAwnersService()
        res.status(200).json({
            status: 200,
            awners
        })
    } catch (error: any) {
        res.status(500).json({
            status: 500,
            message: "something went wrong!"
        })
    }
}

export const getAwnerById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const awner = await findAwnerById(Number(id))
        res.status(200).json({
            status: 200,
            awner
        })
    } catch (error: any) {
        res.status(500).json({
            status: 500,
            message: "something went wrong!"
        })
    }
}