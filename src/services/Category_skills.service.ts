import { Prisma } from "@prisma/client";
import prisma from "../libs/prisma";

export class CategorySkillsServices {

    async getAll() {
        return (await prisma.category_skills.findMany({
            orderBy: {
                id: 'asc'
            }
        }));
    }

    async deleteAll() {
        return await prisma.category_skills.deleteMany({});
    }

    async insert(data: Prisma.category_skillsCreateInput) {
        return await prisma.category_skills.create({
            data
        })
    }

    async getById(id: number) {
        return await prisma.category_skills.findUnique({
            where: { id }
        })
    }

    async deleteById(id: number) {
        return await prisma.category_skills.delete({
            where: { id }
        })
    }

    async updateById(id: number, data: Prisma.category_skillsUpdateInput) {
        return await prisma.category_skills.update({
            where: { id },
            data
        })
    }

    async getByIdWithSkills(id: number) {
        return await prisma.category_skills.findUnique({
            where: { id },
            include: { skills: true }
        })
    }
}