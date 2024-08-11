import prisma from "../libs/prisma";
import { Message } from "../types";

export class MessageService {
    
    async getAll() {
        return await prisma.message.findMany({})
    }

    async getById(id: number) {
        return await prisma.message.findUnique({
            where: { id }
        })
    }

    async getAllByVisitorId(visitor_id: string) {
        return await prisma.message.findMany({
            where: { visitor_id }
        })
    }

    async insert(data: Message) {
        return await prisma.message.create({
            data
        })
    }

    async deleteById(id: number) {
        return await prisma.message.delete({
            where: { id }
        })
    }

    async deleteAll() {
        return await prisma.message.deleteMany({})
    }

    async deleteByVisitorId(visitor_id: string) {
        return await prisma.message.deleteMany({
            where: { visitor_id }
        })
    }

}