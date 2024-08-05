import { Prisma } from "@prisma/client";
import prisma from "../libs/prisma";

export class CategoryProjectsServices {
    

    async getAll() {
        return await prisma.category_projects.findMany({})
    }

    async getById(id: number) {
        return await prisma.category_projects.findUnique({
            where: { id }
        })
    }

    async getWithProjects(id: number) {
        return await prisma.category_projects.findUnique({
            where: { id },
            include: { projects: true }
        })
    }

    async insert(data: Prisma.category_projectsCreateInput) {
        return await prisma.category_projects.create({
            data
        })
    }

    async updateById(data: Prisma.category_projectsUpdateInput, id: number) {
        return await prisma.category_projects.update({
            where: { id },
            data
        })
    }

    async deleteById(id: number) {
        return await prisma.category_projects.delete({
            where: { id }
        })
    }

    async deleteAll() {
        return await prisma.category_projects.deleteMany({})
    }

}