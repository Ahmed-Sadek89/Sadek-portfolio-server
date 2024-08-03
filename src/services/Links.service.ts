import { Prisma, PrismaClient } from "@prisma/client";

export class LinksServices {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient()
    }

    async getAll() {
        const links = await this.prisma.links.findMany({});
        return links
    }

    async getById(id: number) {
        const link = await this.prisma.links.findUnique({
            where: {
                id
            }
        })
        return link
    }

    async getByLinkType(type: string) {
        const link = await this.prisma.links.findMany({
            where: {
                type
            }
        })
        return link
    }

    async insertNewLink(data: Prisma.linksCreateInput) {
        const link = await this.prisma.links.create({
            data
        })
        return link
    }

    async updateLink(id: number, data: Prisma.linksUpdateInput) {
        return await this.prisma.links.update({
            where: { id },
            data
        })
    }

    async deleteById(id: number) {
        return await this.prisma.links.delete({
            where: { id }
        })
    }

    async deleteAll() {
        return await this.prisma.links.deleteMany({})
    }

}