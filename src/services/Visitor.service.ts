import { Prisma } from "@prisma/client";
import prisma from "../libs/prisma";


export class VisitorService {
    
    async insert(data: Prisma.visitorCreateInput) {
        return await prisma.visitor.create({
            data
        })
    }

    async getAll() {
        return await prisma.visitor.findMany({});
    }

    async getById(id: string) {
        return await prisma.visitor.findUnique({
            where: { id }
        })
    }

    async updateById(id: string, data: Prisma.visitorUpdateInput) {
        return await prisma.visitor.update({
            where: { id },
            data
        })
    }

    async deleteAll() {
        return await prisma.visitor.deleteMany({})
    }

    async deleteById(id: string) {
        return await prisma.visitor.delete({
            where: { id }
        })
    }

    async getMessagesByVisitorId(id: string) {
        return await prisma.visitor.findUnique({
            where: { id },
            include: { messages: true }
        })
    }

    async getNotesByVisitorId(id: string) {
        return await prisma.visitor.findUnique({
            where: { id },
            include: { project_notes: true }
        })
    }
}