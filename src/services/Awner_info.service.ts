import { Prisma } from "@prisma/client";
import prisma from "../libs/prisma";

export class AwnerInfoService {
    
    async insertAwnerInfo(data: Prisma.awner_infoCreateInput) {
        const awner_info = await prisma.awner_info.create({
            data
        })
        return awner_info
    }

    async getAwnerInfo() {
        const awner_info = await prisma.awner_info.findFirst({});
        return awner_info;
    }

    async updateAwnerInfo(data: Prisma.awner_infoUpdateInput) {
        return await prisma.awner_info.update({
            where: {id: 1},
            data
        })
    }
}