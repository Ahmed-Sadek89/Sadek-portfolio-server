import prisma from "../libs/prisma";

type data = {
    title: string;
    description: string;
    live_url: string;
    repo_url: string;
    status: string;
    created_at: string | Date;
    ended_at: string;
    attachment: string;
    category_project_id: number
}
export class ProjectServices {
    
    async getAll() {
        return await prisma.projects.findMany({})
    }

    async getById(id: number) {
        return await prisma.projects.findUnique({
            where: { id }
        })
    }

    async insert(data: data) {
        return await prisma.projects.create({
            data
        })
    }

    async updateById(id: number, data: data) {
        return await prisma.projects.update({
            where: { id },
            data
        })
    }

    async deleteById(id: number) {
        return await prisma.projects.delete({
            where: { id }
        })
    }


    // join
    async deleteAllByCategoryId(category_project_id: number) {
        return await prisma.projects.deleteMany({
            where: { category_project_id }
        })
    }

    async getProjectNotesByProjectId(id: number) {
        // 
        return await prisma.projects.findUnique({
            where: { id },
            include: { project_notes: true }
        })
    }
}