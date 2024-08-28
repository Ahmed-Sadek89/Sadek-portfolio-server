import { Request, Response } from "express";
import { PhonesServices } from "../services/Phones.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const phonesServices = new PhonesServices();

export class PhonesController {

    async getAll(req: Request, res: Response) {
        const awner_id = Number(req.params.awner_id)
        try {
            const phones = await phonesServices.getAll(awner_id);
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

    async insertNewPhone(req: Request, res: Response) {
        try {
            await phonesServices.insertNewPhone(req.body)
            res.status(200).json({
                status: 200,
                message: "new phone inserted successfully"
            })
        } catch (error: any) {
            console.log({ error: error.message })
            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
                res.status(409).json({
                    status: 409,
                    message: 'This phone number is already exists.',
                });
            } else {
                res.status(500).json({
                    status: 200,
                    message: "something went wrong",
                });
            }
        }
    }

    async updatePhone(req: Request, res: Response) {
        const { id } = req.params
        try {
            await phonesServices.updatePhone(Number(id), req.body)
            res.status(200).json({
                status: 200,
                message: `the phone number ${id} updated successfully`
            })
        } catch (error: any) {
            console.log({ error: error.message })
            if (error.code === 'P2025') { // Prisma error for "Record to update does not exist"
                res.status(404).json({
                    status: 404,
                    message: `Phone number ${id} is not found`,
                });
            } else if (error.code === 'P2002') { // Prisma error code for unique constraint violation
                res.status(409).json({
                    status: 409,
                    message: 'This phone number already exists.',
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
            await phonesServices.deleteById(Number(id), awner_id)
            res.status(200).json({
                status: 200,
                message: `The phone number ${id} deleted successfully`
            })
        } catch (error: any) {
            console.log({ error: error.message })
            if (error.code === 'P2025') {  // P2025 is the Prisma error code for "Record to delete does not exist."
                res.status(404).json({
                    status: 404,
                    message: `The phone number ${id} is not found`,
                });
            } else {
                res.status(500).json({
                    status: 500,
                    message: 'Internal server error',
                });
            }
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