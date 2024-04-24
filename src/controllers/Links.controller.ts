import { Request, Response } from "express";
import { LinksServices } from "../services/Links.service";
import { removeFromCloudinary, uploadToCloudinary } from "../config/cloudinaryFunctions.config";

const linksServices = new LinksServices();

export class LinksController {

    async getAll(req: Request, res: Response) {
        try {
            const links = await linksServices.getAll();
            res.status(200).json({
                status: 200,
                links
            })
        } catch (error: any) {
            console.log(error.message)
            res.status(500).json({
                status: 500,
                message: "something went wrong"
            })
        }
    }

    async getByLinkType(req: Request, res: Response) {
        try {
            const { type } = req.query
            const links = await linksServices.getByLinkType(type as string);

            res.status(200).json({
                status: 200,
                links
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
            const link = await linksServices.getById(Number(id));
            res.status(200).json({
                status: 200,
                link: link && {
                    ...link,
                }
            })
        } catch (error: any) {
            res.status(500).json({
                status: 500,
                message: "something went wrong"
            })
        }
    }

    async insertNewLink(req: Request, res: Response) {
        try {
            if (!req.file) {
                throw new Error("path not found")
            }
            const uploadedImage = await uploadToCloudinary(req.file?.path)
            await linksServices.insertNewLink({ ...req.body, icon: uploadedImage.secure_url })
            res.status(200).json({
                status: 200,
                message: "new link inserted successfully"
            })
        } catch (error: any) {
            console.log({ error: error.message })
            res.status(500).json({
                status: 500,
                message: "something went wrong"
            })
        }
    }

    async updateLink(req: Request, res: Response) {
        try {
            const { id } = req.params
            if (!req.file) {
                throw new Error("path not found")
            }
            const uploadedImage = await uploadToCloudinary(req.file?.path)
            await linksServices.updateLink(Number(id), { ...req.body, icon: uploadedImage.secure_url })
            res.status(200).json({
                status: 200,
                message: `the link number ${id} updated successfully`
            })
        } catch (error: any) {
            console.log(error.message)
            res.status(500).json({
                status: 500,
                message: "something went wrong"
            })
        }
    }

    async deleteById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const link = await linksServices.getById(Number(id));
            if (link) {
                await removeFromCloudinary(link.icon)
                await linksServices.deleteById(Number(id))
                res.status(200).json({
                    status: 200,
                    message: `the link number ${id} deleted successfully`
                })
            } else {
                res.status(404).json({
                    status: 404,
                    message: `the link number ${id} is not found to deleted`
                })
            }
        } catch (error: any) {
            console.log(error.message)
            res.status(500).json({
                status: 500,
                message: "something went wrong"
            })
        }
    }

    async deleteAll(req: Request, res: Response) {
        try {
            const links = await linksServices.getAll();
            if (links.length > 0) {
                links.map(index => {
                    return removeFromCloudinary(index.icon)
                })
                await linksServices.deleteAll()
                res.status(200).json({
                    status: 200,
                    message: `all links are deleted`
                })
            }
        } catch (error: any) {
            res.status(500).json({
                status: 500,
                message: "something went wrong"
            })
        }
    }
}