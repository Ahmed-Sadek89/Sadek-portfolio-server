import { Prisma, PrismaClient } from "@prisma/client";


export class VisitorService {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async insert(data: Prisma.VisitorCreateInput) {
        return await this.prisma.visitor.create({
            data
        })
    }

    async getAll() {
        return await this.prisma.visitor.findMany({});
    }

    async getById(id: string) {
        return await this.prisma.visitor.findUnique({
            where: { id }
        })
    }

    async updateById(id: string, data: Prisma.VisitorUpdateInput) {
        return await this.prisma.visitor.update({
            where: { id },
            data
        })
    }

    async deleteAll() {
        return await this.prisma.visitor.deleteMany({})
    }

    async deleteById(id: string) {
        return await this.prisma.visitor.delete({
            where: { id }
        })
    }

    async getMessagesByVisitorId(id: string) {
        return await this.prisma.visitor.findUnique({
            where: { id },
            include: { Messages: true }
        })
    }

    async getNotesByVisitorId(id: string) {
        return await this.prisma.visitor.findUnique({
            where: { id },
            include: { Project_notes: true }
        })
    }
}