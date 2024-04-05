import { Request, Response } from "express";
import { PhonesServices } from "../services/Phones.service";

const phonesServices = new PhonesServices();

export class PhonesController {

    async getAll(req: Request, res: Response) {
        try {
            const phones = await phonesServices.getAll();
            res.status(200).json({
                status: 200,
                phones
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
            const { id } = req.params;
            const phone = await phonesServices.getById(Number(id));
            res.status(200).json({
                status: 200,
                phone
            })
        } catch (error: any) {
            res.status(500).json({
                status: 500,
                message: "something went wrong"
            })
        }
    }

    async insertNewPhone(req: Request, res: Response) {
        try {
            await phonesServices.insertNewPhone(req.body)
            res.status(200).json({
                status: 200,
                message: "new phone inserted successfully"
            })
        } catch (error: any) {
            console.log({ error: error.message })
            res.status(500).json({
                status: 500,
                message: "something went wrong"
            })
        }
    }

    async updatePhone(req: Request, res: Response) {
        try {
            const { id } = req.params
            await phonesServices.updatePhone(Number(id), req.body)
            res.status(200).json({
                status: 200,
                message: `the phone number ${id} updated successfully`
            })
        } catch (error: any) {
            res.status(500).json({
                status: 500,
                message: "something went wrong"
            })
        }
    }

    async deleteById(req: Request, res: Response) {
        try {
            const { id } = req.params
            await phonesServices.deleteById(Number(id))
            res.status(200).json({
                status: 200,
                message: `the phone number ${id} deleted successfully`
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
            await phonesServices.deleteAll()
            res.status(200).json({
                status: 200,
                message: `all phones are deleted`
            })
        } catch (error: any) {
            res.status(500).json({
                status: 500,
                message: "something went wrong"
            })
        }
    }
}