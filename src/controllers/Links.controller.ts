import { Request, Response } from "express";
import { LinksServices } from "../services/Links.service";
import { removeFromCloudinary, uploadToCloudinary } from "../config/cloudinaryFunctions.config";

const linksServices = new LinksServices();

export class LinksController {

    async getByAwnerId(req: Request, res: Response) {
        try {
            const { awner_id } = req.params;
            const links = await linksServices.getByAwnerId(Number(awner_id));
            const modifiedLinks = links.map(link => ({
                id: link.id,
                title: link.title,
                link: link.link,
                icon: link.icon,
                link_type: link.LinkType?.link_type,
                link_type_id: link.LinkType?.id,
            }));
            res.status(200).json({
                status: 200,
                links: modifiedLinks
            })
        } catch (error: any) {
            console.log(error.message)
            res.status(500).json({
                status: 500,
                message: "something went wrong"
            })
        }
    }

    async getByLinkTypeAndAwnerId(req: Request, res: Response) {
        const { link_type_id } = req.params
        const { awner_id } = req.query
        try {
            let links = await linksServices.getByLinkTypeAndAwnerId(Number(link_type_id), Number(awner_id));
            const modifiedLinks = links.map(link => ({
                id: link.id,
                title: link.title,
                link: link.link,
                icon: link.icon,
                link_type: link.LinkType?.link_type,
                link_type_id: link.LinkType?.id,
            }));


            res.status(200).json({
                status: 200,
                links: modifiedLinks
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
        const link_type_id = Number(req.body.link_type_id);
        const awner_id = Number(req.body.awner_id);
        try {
            if (!req.file) {
                throw new Error("path not found")
            }

            let uploadedImage = await uploadToCloudinary(req.file?.path)
            await linksServices.insertNewLink({ ...req.body, link_type_id, awner_id, icon: uploadedImage?.secure_url })

            res.status(200).json({
                status: 200,
                message: "New link inserted successfully"
            })
        } catch (error: any) {
            console.log({ error: error.message })
            if (error.code === 'P2002') { // Handle the unique constraint error
                res.status(400).json({
                    statusCode: 400,
                    message: `The title or the link already exists`
                });
            } else {
                res.status(500).json({
                    status: 500,
                    message: error
                })
            }
        }
    }

    async updateLink(req: Request, res: Response) {
        let { existedIcon, ...body } = req.body
        const awner_id = Number(body.awner_id)
        const link_type_id = Number(body.link_type_id)
        const id = Number(req.params.id)
        try {
            let uploadedImage
            if (req.file && req.file.size !== 0) {
                uploadedImage = await uploadToCloudinary(req.file?.path)
            } else {
                uploadedImage = { secure_url: existedIcon }
            }

            await linksServices.updateLink(id, { ...body, link_type_id, awner_id, icon: uploadedImage?.secure_url })
            res.status(200).json({
                status: 200,
                message: `the link number ${id} updated successfully`
            })
        } catch (error: any) {
            console.log(error.message)
            if (error.code === 'P2002') {
                res.status(409).json({
                    status: 409,
                    message: 'Title or Link are already exists.',
                });
            } else {
                res.status(500).json({
                    status: 200,
                    message: "something went wrong",
                });
            }
        }
    }

    async deleteById(req: Request, res: Response) {
        const { id } = req.params;
        const { awner_id } = req.body
        try {
            const link = await linksServices.getById(Number(id));
            if (link) {
                await removeFromCloudinary(link.icon as string)
                await linksServices.deleteById(Number(id), Number(awner_id))
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

}