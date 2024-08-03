import { Prisma, PrismaClient } from "@prisma/client";

export class AwnerInfoService {
    private readonly prisma: PrismaClient
    constructor() {
        this.prisma = new PrismaClient();
    }

    async insertAwnerInfo(data: Prisma.awner_infoCreateInput) {
        const awner_info = await this.prisma.awner_info.create({
            data
        })
        return awner_info
    }

    async getAwnerInfo() {
        const awner_info = await this.prisma.awner_info.findFirst({});
        return awner_info;
    }

    async updateAwnerInfo(data: Prisma.awner_infoUpdateInput) {
        return await this.prisma.awner_info.update({
            where: {id: 1},
            data
        })
    }
}