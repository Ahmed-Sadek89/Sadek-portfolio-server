import { Prisma } from "@prisma/client";
import prisma from "../libs/prisma";

export class JobTitlesServices {

    async getAll() {
        const job_titles = await prisma.job_titles.findMany({});
        return job_titles
    }

    async getById(id: number) {
        const job_title = await prisma.job_titles.findUnique({
            where: {
                id
            }
        })
        return job_title
    }

    async insertNewJobTitle(data: Prisma.job_titlesCreateInput) {
        const job_title = await prisma.job_titles.create({
            data
        })
        return job_title
    }

    async updateJobTitle(id: number, data: Prisma.job_titlesUpdateInput) {
        return await prisma.job_titles.update({
            where: { id },
            data
        })
    }

    async deleteById(id: number) {
        return await prisma.job_titles.delete({
            where: { id }
        })
    }

    async deleteAll() {
        return await prisma.job_titles.deleteMany({})
    }

}