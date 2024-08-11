import prisma from "../libs/prisma";
import { CategorySkill } from "../types";

export class CategorySkillsServices {

    async getAll() {
        return (await prisma.categorySkill.findMany({
            orderBy: {
                id: 'asc'
            }
        }));
    }

    async deleteAll() {
        return await prisma.categorySkill.deleteMany({});
    }

    async insert(data: CategorySkill) {
        return await prisma.categorySkill.create({
            data
        })
    }

    async getById(id: number) {
        return await prisma.categorySkill.findUnique({
            where: { id }
        })
    }

    async deleteById(id: number) {
        return await prisma.categorySkill.delete({
            where: { id }
        })
    }

    async updateById(id: number, data: CategorySkill) {
        return await prisma.categorySkill.update({
            where: { id },
            data
        })
    }

    async getByIdWithSkills(id: number) {
        return await prisma.categorySkill.findUnique({
            where: { id },
            include: { Skill: true }
        })
    }
}