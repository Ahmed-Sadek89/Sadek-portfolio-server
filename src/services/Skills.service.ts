import prisma from "../libs/prisma";

type data = { title: string, icon: string | undefined, category_id: number }

export class SkillsServices {
    
    async getByCategoryId(category_id: number) {
        return await prisma.skills.findMany({
            where: { category_id }
        })
    }

    async getById(id: number) {
        return await prisma.skills.findUnique({
            where: { id }
        })
    }

    async insert(data: data) {
        const newSkill = await prisma.skills.create({
            data: {
                title: data.title,
                icon: data.icon || '',
                category_id: data.category_id
            }
        })
        return newSkill;
    }

    async updateById(id: number, data: data) {
        return await prisma.skills.update({
            where: { id },
            data
        })
    }

    async deleteById(id: number) {
        return await prisma.skills.delete({
            where: { id }
        })
    }

    async deleteByCategoryId(category_id: number) {
        return await prisma.skills.deleteMany({
            where: { category_id }
        })
    }
}