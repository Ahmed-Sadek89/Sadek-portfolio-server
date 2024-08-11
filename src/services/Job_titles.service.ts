import prisma from "../libs/prisma";
import { JobTitle } from "../types";

export class JobTitlesServices {

    async getAll() {
        const job_titles = await prisma.jobTitle.findMany({});
        return job_titles
    }

    async getById(id: number) {
        const job_title = await prisma.jobTitle.findUnique({
            where: {
                id
            }
        })
        return job_title
    }

    async insertNewJobTitle(data: JobTitle) {
        const job_title = await prisma.jobTitle.create({
            data
        })
        return job_title
    }

    async updateJobTitle(id: number, data: JobTitle) {
        return await prisma.jobTitle.update({
            where: { id },
            data
        })
    }

    async deleteById(id: number) {
        return await prisma.jobTitle.delete({
            where: { id }
        })
    }

    async deleteAll() {
        return await prisma.jobTitle.deleteMany({})
    }

}