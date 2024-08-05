import { Prisma } from "@prisma/client";
import prisma from "../libs/prisma";

export class LinksServices {
   
    async getAll() {
        const links = await prisma.links.findMany({});
        return links
    }

    async getById(id: number) {
        const link = await prisma.links.findUnique({
            where: {
                id
            }
        })
        return link
    }

    async getByLinkType(type: string) {
        const link = await prisma.links.findMany({
            where: {
                type
            }
        })
        return link
    }

    async insertNewLink(data: Prisma.linksCreateInput) {
        const link = await prisma.links.create({
            data
        })
        return link
    }

    async updateLink(id: number, data: Prisma.linksUpdateInput) {
        return await prisma.links.update({
            where: { id },
            data
        })
    }

    async deleteById(id: number) {
        return await prisma.links.delete({
            where: { id }
        })
    }

    async deleteAll() {
        return await prisma.links.deleteMany({})
    }

}