import prisma from "../libs/prisma";
import { Visitor } from "../types";


export class VisitorService {

    async insert(data: Visitor) {
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

    async updateById(id: string, data: Visitor) {
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
            include: { Message: true }
        })
    }

    async getNotesByVisitorId(id: string) {
        return await prisma.visitor.findUnique({
            where: { id },
            include: { ProjectNote: true }
        })
    }
}