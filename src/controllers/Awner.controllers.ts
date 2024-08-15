import { Request, Response } from "express";
import { AwnerServices } from "../services/Awner.service";
import { removeFromCloudinary, uploadToCloudinary } from "../config/cloudinaryFunctions.config";
import { AwnerWithoutPassword } from "../types";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const awnerServices = new AwnerServices()

export class AwnerController {

    async registerAwnerController(req: Request, res: Response) {
        try {

            let uploadedImageToCloudiary = { secure_url: "" }
            if (req.file) {
                uploadedImageToCloudiary = await uploadToCloudinary(req.file?.path as any)
            }

            await awnerServices.postAwnerService({
                ...req.body,
                image: uploadedImageToCloudiary.secure_url
            })
            res.status(200).json({
                status: 200,
                message: "new awner added successfully"
            })
        } catch (error: any) {
            console.log(error)
            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
                res.status(409).json({
                    status: 409,
                    message: 'Awner with this email already exists.',
                });
            } else {
                res.status(500).json({
                    status: 200,
                    message: 'Internal Server Error',
                });
            }
        }
    }

    async loginAwnerController(req: Request, res: Response) {
        try {
            console.log(req.body)
            const awner = await awnerServices.loginAwnerService(req.body);
            if (awner) {
                res.status(200).json({
                    status: 200,
                    result: awner
                })
            } else {
                res.status(404).json({
                    status: 404,
                    result: "invalid email or password"
                })
            }
        } catch (error: any) {
            console.log({error: error.message})
            res.status(500).json({
                status: 500,
                result: error.message
            })
        }
    }
    async getPrimeAwner(req: Request, res: Response) {
        try {
            const awner = await awnerServices.getPrimeAwner()
            if (awner) {
                const { password, ...others } = awner
                res.status(200).json({
                    status: 200,
                    awner: {
                        ...others
                    }
                })
            } else {
                res.status(404).json({
                    status: 404,
                    awner: null
                })
            }
        } catch (error: any) {
            res.status(500).json({
                status: 500,
                message: "something went wrong!"
            })
        }
    }
    async getAllAwners(_: Request, res: Response) {
        try {
            const awners = await awnerServices.findAllAwnersService();
            let result: AwnerWithoutPassword[] = [];
            awners.map((index) => {
                result.push(index);
            })
            res.status(200).json({
                status: 200,
                awners: result
            })
        } catch (error: any) {
            res.status(500).json({
                status: 500,
                message: "something went wrong!"
            })
        }
    }

    async getAwnerById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const awner = await awnerServices.findAwnerById(Number(id))
            if (awner) {
                const { password, ...others } = awner
                res.status(200).json({
                    status: 200,
                    awner: {
                        ...others
                    }
                })
            } else {
                res.status(404).json({
                    status: 404,
                    awner: null
                })
            }
        } catch (error: any) {
            res.status(500).json({
                status: 500,
                message: "something went wrong!"
            })
        }
    }

    async deleteAllAwnersController(req: Request, res: Response) {
        try {
            const awners = await awnerServices.findAllAwnersService();
            if (awners.length > 0) {
                awners.map(index => {
                    return removeFromCloudinary(index.image as string)
                })
                await awnerServices.deleteAllAwnersService();
                res.status(200).json({
                    status: 200,
                    awner: "All awners deleted successfully"
                })
            } else {
                res.status(200).json({
                    status: 200,
                    awner: `No Awners are found`
                })
            }
        } catch (error: any) {
            console.error(error)
            res.status(500).json({
                status: 500,
                message: "something went wrong!"
            })
        }
    }

    async deleteAwnerByIdController(req: Request, res: Response) {
        try {
            const { id } = req.params
            const awner = await awnerServices.findAwnerById(Number(id))
            if (awner) {
                await removeFromCloudinary(awner.image as string)
                await awnerServices.deleteAwnerByIdService(Number(id));
                res.status(200).json({
                    status: 200,
                    awner: `Awner number ${id} is deleted successfully`
                })
            } else {
                res.status(200).json({
                    status: 200,
                    awner: `Awner number ${id} is not found`
                })
            }
        } catch (error: any) {
            res.status(500).json({
                status: 500,
                message: "something went wrong!"
            })
        }
    }

    async updateAwnerById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            let uploadedImageToCloudiary = { secure_url: "" }
            if (req.file) {
                uploadedImageToCloudiary = await uploadToCloudinary(req.file?.path as any)
                await awnerServices.updateAwnerByIdService(Number(id), { ...req.body, image: uploadedImageToCloudiary.secure_url });
            } else {
                await awnerServices.updateAwnerByIdService(Number(id), { ...req.body });

            }
            res.status(200).json({
                status: 200,
                awner: `Awner number ${id} id updated successfully`
            })
        } catch (error: any) {
            console.error(error)
            res.status(500).json({
                status: 500,
                message: "something went wrong!"
            })
        }
    }
}