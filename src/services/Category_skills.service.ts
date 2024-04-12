import { Prisma, PrismaClient } from "@prisma/client";

export class CategorySkillsServices {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient()
    }

    async getAll() {
        return await this.prisma.category_skills.findMany({});
    }

    async deleteAll() {
        return await this.prisma.category_skills.deleteMany({});
    }

    async insert(data: Prisma.Category_skillsCreateInput) {
        return await this.prisma.category_skills.create({
            data
        })
    }

    async getById(id: number) {
        return await this.prisma.category_skills.findUnique({
            where: { id }
        })
    }

    async deleteById(id: number) {
        return await this.prisma.category_skills.delete({
            where: { id }
        })
    }

    async updateById(id: number, data: Prisma.Category_skillsUpdateInput) {
        return await this.prisma.category_skills.update({
            where: { id },
            data
        })
    }

    async getByIdWithSkills(id: number) {
        return await this.prisma.category_skills.findUnique({
            where: { id },
            include: { skills: true }
        })
    }
}