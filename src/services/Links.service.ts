import prisma from "../libs/prisma";
import { Link } from "../types";

export class LinksServices {
   
    async getByAwnerId(awner_id: number) {
        const links = await prisma.link.findMany({
            where: {
                awner_id
            }
        });
        return links
    }

    async getById(id: number) {
        const link = await prisma.link.findUnique({
            where: {
                id
            }
        })
        return link
    }

    async getByLinkType(type: string) {
        const link = await prisma.link.findMany({
            where: {
                id: 1
            }
        })
        return link
    }

    async insertNewLink(data: Link) {
        const link = await prisma.link.create({
            data
        })
        return link
    }

    async updateLink(id: number, data: Link) {
        return await prisma.link.update({
            where: { id },
            data
        })
    }

    async deleteById(id: number) {
        return await prisma.link.delete({
            where: { id }
        })
    }

    async deleteAll() {
        return await prisma.link.deleteMany({})
    }

}