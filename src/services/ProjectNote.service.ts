import { Prisma, PrismaClient } from "@prisma/client";

export class ProjectNoteService {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async insert(data: Prisma.project_notesCreateInput) {
        return await this.prisma.project_notes.create({
            data
        })
    }

    async getAll() {
        return await this.prisma.project_notes.findMany({})
    }

    async getById(id: number) {
        return await this.prisma.project_notes.findUnique({
            where: { id }
        })
    }

    async getAllByVisitorId(visitor_id: string) {
        return await this.prisma.project_notes.findMany({
            where: { visitor_id }
        })
    }

    async getAllByProjectId(project_id: number) {
        return await this.prisma.project_notes.findMany({
            where: { project_id }
        })
    }

    async deleteAll() {
        return await this.prisma.project_notes.deleteMany({})
    }

    async deleteById(id: number) {
        return await this.prisma.project_notes.delete({
            where: { id }
        })
    }

    async deleteAllByVisitorId(visitor_id: string) {
        return await this.prisma.project_notes.deleteMany({
            where: { visitor_id }
        })
    }

    async deleteAllByProjectId(project_id: number) {
        return await this.prisma.project_notes.deleteMany({
            where: { project_id }
        })
    }


}