import { Prisma, PrismaClient } from "@prisma/client";

export class CategoryProjectsServices {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async getAll() {
        return await this.prisma.category_projects.findMany({})
    }

    async getById(id: number) {
        return await this.prisma.category_projects.findUnique({
            where: { id }
        })
    }

    async getWithProjects(id: number) {
        return await this.prisma.category_projects.findUnique({
            where: { id },
            include: { Projects: true }
        })
    }

    async insert(data: Prisma.Category_projectsCreateInput) {
        return await this.prisma.category_projects.create({
            data
        })
    }

    async updateById(data: Prisma.Category_projectsUpdateInput, id: number) {
        return await this.prisma.category_projects.update({
            where: { id },
            data
        })
    }

    async deleteById(id: number) {
        return await this.prisma.category_projects.delete({
            where: { id }
        })
    }

    async deleteAll() {
        return await this.prisma.category_projects.deleteMany({})
    }

}