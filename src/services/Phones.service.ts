import { Prisma } from "@prisma/client";
import prisma from "../libs/prisma";

export class PhonesServices {
    
    async getAll() {
        const phones = await prisma.phones.findMany({});
        return phones
    }

    async getById(id: number) {
        const phone = await prisma.phones.findUnique({
            where: {
                id
            }
        })
        return phone
    }

    async insertNewPhone(data: Prisma.phonesCreateInput) {
        const phone = await prisma.phones.create({
            data
        })
        return phone
    }

    async updatePhone(id: number, data: Prisma.phonesUpdateInput) {
        return await prisma.phones.update({
            where: { id },
            data
        })
    }

    async deleteById(id: number) {
        return await prisma.phones.delete({
            where: { id }
        })
    }

    async deleteAll() {
        return await prisma.phones.deleteMany({})
    }

}