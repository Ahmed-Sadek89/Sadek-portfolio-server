import { Request, Response } from "express";
import { LinksServices } from "../services/Links.service";
import dotenv from 'dotenv';
import { generateImagePath } from "../config/ImagePath.config";

const linksServices = new LinksServices();

export class LinksController {
    constructor() {
        dotenv.config()
    }

    async getAll(req: Request, res: Response) {
        try {
            const links = await linksServices.getAll();
            links?.map((index) => {
                index.icon = generateImagePath(index.icon);
            })
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
            links?.map((index) => {
                index.icon = generateImagePath(index.icon);
            })
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
            const ImagePath = link ? generateImagePath(link.icon) : "";
            res.status(200).json({
                status: 200,
                link: link && {
                    ...link,
                    icon :ImagePath
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
            const icon = req.file?.filename
            await linksServices.insertNewLink({ ...req.body, icon })
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
            const icon = req.file?.filename
            await linksServices.updateLink(Number(id), { ...req.body, icon })
            res.status(200).json({
                status: 200,
                message: `the link number ${id} updated successfully`
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
            await linksServices.deleteById(Number(id))
            res.status(200).json({
                status: 200,
                message: `the link number ${id} deleted successfully`
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
            await linksServices.deleteAll()
            res.status(200).json({
                status: 200,
                message: `all links are deleted`
            })
        } catch (error: any) {
            res.status(500).json({
                status: 500,
                message: "something went wrong"
            })
        }
    }
}