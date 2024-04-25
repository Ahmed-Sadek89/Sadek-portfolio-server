import { PrismaClient } from "@prisma/client";


type data = {
    title: string;
    description: string;
    live_url: string;
    repo_url: string;
    status: string;
    created_at: string | Date;
    ended_at: string;
    attachment: string;
    category_project_id: number
}
export class ProjectServices {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async getAll() {
        return await this.prisma.projects.findMany({})
    }

    async getById(id: number) {
        return await this.prisma.projects.findUnique({
            where: { id }
        })
    }

    async insert(data: data) {
        return await this.prisma.projects.create({
            data
        })
    }

    async updateById(id: number, data: data) {
        return await this.prisma.projects.update({
            where: { id },
            data
        })
    }

    async deleteById(id: number) {
        return await this.prisma.projects.delete({
            where: { id }
        })
    }


    // join
    async deleteAllByCategoryId(category_project_id: number) {
        return await this.prisma.projects.deleteMany({
            where: { category_project_id }
        })
    }

    async getProjectNotesByProjectId(id: number) {
        // 
        return await this.prisma.projects.findUnique({
            where: { id },
            include: { project_notes: true }
        })
    }
}