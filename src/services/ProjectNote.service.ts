import prisma from "../libs/prisma";
import { ProjectNote } from "../types";

export class ProjectNoteService {
    
    async insert(data: ProjectNote) {
        return await prisma.projectNote.create({
            data
        })
    }

    async getAll() {
        return await prisma.projectNote.findMany({})
    }

    async getById(id: number) {
        return await prisma.projectNote.findUnique({
            where: { id }
        })
    }

    async getAllByVisitorId(visitor_id: string) {
        return await prisma.projectNote.findMany({
            where: { visitor_id }
        })
    }

    async getAllByProjectId(project_id: number) {
        return await prisma.projectNote.findMany({
            where: { project_id }
        })
    }

    async deleteAll() {
        return await prisma.projectNote.deleteMany({})
    }

    async deleteById(id: number) {
        return await prisma.projectNote.delete({
            where: { id }
        })
    }

    async deleteAllByVisitorId(visitor_id: string) {
        return await prisma.projectNote.deleteMany({
            where: { visitor_id }
        })
    }

    async deleteAllByProjectId(project_id: number) {
        return await prisma.projectNote.deleteMany({
            where: { project_id }
        })
    }


}