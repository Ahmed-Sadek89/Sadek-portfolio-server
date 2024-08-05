import { Prisma } from "@prisma/client";
import prisma from "../libs/prisma";

export class MessageService {
    
    async getAll() {
        return await prisma.messages.findMany({})
    }

    async getById(id: number) {
        return await prisma.messages.findUnique({
            where: { id }
        })
    }

    async getAllByVisitorId(visitor_id: string) {
        return await prisma.messages.findMany({
            where: { visitor_id }
        })
    }

    async insert(data: Prisma.messagesCreateInput) {
        return await prisma.messages.create({
            data
        })
    }

    async deleteById(id: number) {
        return await prisma.messages.delete({
            where: { id }
        })
    }

    async deleteAll() {
        return await prisma.messages.deleteMany({})
    }

    async deleteByVisitorId(visitor_id: string) {
        return await prisma.messages.deleteMany({
            where: { visitor_id }
        })
    }

}