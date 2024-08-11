import prisma from "../libs/prisma";
import { CategoryProject } from "../types";

export class CategoryProjectsServices {
    

    async getAll() {
        return await prisma.categoryProject.findMany({})
    }

    async getById(id: number) {
        return await prisma.categoryProject.findUnique({
            where: { id }
        })
    }

    async getWithProjects(id: number) {
        return await prisma.categoryProject.findUnique({
            where: { id },
            include: { Project: true }
        })
    }

    async insert(data: CategoryProject) {
        return await prisma.categoryProject.create({
            data
        })
    }

    async updateById(data: CategoryProject, id: number) {
        return await prisma.categoryProject.update({
            where: { id },
            data
        })
    }

    async deleteById(id: number) {
        return await prisma.categoryProject.delete({
            where: { id }
        })
    }

    async deleteAll() {
        return await prisma.categoryProject.deleteMany({})
    }

}