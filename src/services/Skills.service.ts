import { Prisma, PrismaClient } from "@prisma/client";

export class SkillsServices {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async getByCategoryId(category_id: number) {
        return await this.prisma.skills.findMany({
            where: { category_id }
        })
    }

    async getById(id: number) {
        return await this.prisma.skills.findUnique({
            where: { id }
        })
    }

    async insert({ title, icon, category_id }: { title: string, icon: string, category_id: number }) {
        const newSkill = await this.prisma.skills.create({
            data: { title, icon, category_id }
        })
        return newSkill;
    }

    async updateById(id: number, data: Prisma.SkillsUpdateInput) {
        return await this.prisma.skills.update({
            where: { id },
            data
        })
    }

    async deleteById(id: number) {
        return await this.prisma.skills.delete({
            where: { id }
        })
    }

    async deleteByCategoryId(category_id: number) {
        return await this.prisma.skills.deleteMany({
            where: { category_id }
        })
    }
}