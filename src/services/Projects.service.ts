import prisma from "../libs/prisma";
import { Project } from "../types";


export class ProjectServices {

    async getAll() {
        return await prisma.project.findMany({})
    }

    async getById(id: number) {
        return await prisma.project.findUnique({
            where: { id }
        })
    }

    async insert(data: Project) {
        return await prisma.project.create({
            data
        })
    }

    async updateById(id: number, data: Project) {
        return await prisma.project.update({
            where: { id },
            data
        })
    }

    async deleteById(id: number) {
        return await prisma.project.delete({
            where: { id }
        })
    }


    // join
    async deleteAllByCategoryId(category_project_id: number) {
        return await prisma.project.deleteMany({
            where: { category_project_id }
        })
    }

    async getProjectNotesByProjectId(id: number) {
        // 
        return await prisma.project.findUnique({
            where: { id },
            include: { ProjectNote: true }
        })
    }
}