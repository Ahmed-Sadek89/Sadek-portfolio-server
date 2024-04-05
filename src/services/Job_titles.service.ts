import { Prisma, PrismaClient } from "@prisma/client";

export class JobTitlesServices {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient()
    }

    async getAll() {
        const job_titles = await this.prisma.job_titles.findMany({});
        return job_titles
    }

    async getById(id: number) {
        const job_title = await this.prisma.job_titles.findUnique({
            where: {
                id
            }
        })
        return job_title
    }

    async insertNewJobTitle(data: Prisma.job_titlesCreateInput) {
        const job_title = await this.prisma.job_titles.create({
            data
        })
        return job_title
    }

    async updateJobTitle(id: number, data: Prisma.job_titlesUpdateInput) {
        return await this.prisma.job_titles.update({
            where: { id },
            data
        })
    }

    async deleteById(id: number) {
        return await this.prisma.job_titles.delete({
            where: { id }
        })
    }

    async deleteAll() {
        return await this.prisma.job_titles.deleteMany({})
    }

}