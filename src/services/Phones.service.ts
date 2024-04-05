import { Prisma, PrismaClient } from "@prisma/client";

export class PhonesServices {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient()
    }

    async getAll() {
        const phones = await this.prisma.phones.findMany({});
        return phones
    }

    async getById(id: number) {
        const phone = await this.prisma.phones.findUnique({
            where: {
                id
            }
        })
        return phone
    }

    async insertNewPhone(data: Prisma.phonesCreateInput) {
        const phone = await this.prisma.phones.create({
            data
        })
        return phone
    }

    async updatePhone(id: number, data: Prisma.phonesUpdateInput) {
        return await this.prisma.phones.update({
            where: { id },
            data
        })
    }

    async deleteById(id: number) {
        return await this.prisma.phones.delete({
            where: { id }
        })
    }

    async deleteAll() {
        return await this.prisma.phones.deleteMany({})
    }

}