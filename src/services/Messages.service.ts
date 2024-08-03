import { Prisma, PrismaClient } from "@prisma/client";

export class MessageService {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient()
    }

    async getAll() {
        return await this.prisma.messages.findMany({})
    }

    async getById(id: number) {
        return await this.prisma.messages.findUnique({
            where: { id }
        })
    }

    async getAllByVisitorId(visitor_id: string) {
        return await this.prisma.messages.findMany({
            where: { visitor_id }
        })
    }

    async insert(data: Prisma.MessagesCreateInput) {
        return await this.prisma.messages.create({
            data
        })
    }

    async deleteById(id: number) {
        return await this.prisma.messages.delete({
            where: { id }
        })
    }

    async deleteAll() {
        return await this.prisma.messages.deleteMany({})
    }

    async deleteByVisitorId(visitor_id: string) {
        return await this.prisma.messages.deleteMany({
            where: { visitor_id }
        })
    }

}