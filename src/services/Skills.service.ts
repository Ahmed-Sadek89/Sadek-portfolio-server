import prisma from "../libs/prisma";
import { Skills } from "../types";


export class SkillsServices {
    
    async getByCategoryId(category_id: number) {
        return await prisma.skill.findMany({
            where: { category_id }
        })
    }

    async getById(id: number) {
        return await prisma.skill.findUnique({
            where: { id }
        })
    }

    async insert(data: Skills) {
        const newSkill = await prisma.skill.create({
            data
        })
        return newSkill;
    }

    async updateById(id: number, data: Skills) {
        return await prisma.skill.update({
            where: { id },
            data
        })
    }

    async deleteById(id: number) {
        return await prisma.skill.delete({
            where: { id }
        })
    }

    async deleteByCategoryId(category_id: number) {
        return await prisma.skill.deleteMany({
            where: { category_id }
        })
    }
}