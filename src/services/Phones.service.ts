import prisma from "../libs/prisma";
import { Phone } from "../types";

export class PhonesServices {
    
    async getAll() {
        const phones = await prisma.phone.findMany({});
        return phones
    }

    async getById(id: number) {
        const phone = await prisma.phone.findUnique({
            where: {
                id
            }
        })
        return phone
    }

    async insertNewPhone(data: Phone) {
        const phone = await prisma.phone.create({
            data
        })
        return phone
    }

    async updatePhone(id: number, data: Phone) {
        return await prisma.phone.update({
            where: { id },
            data
        })
    }

    async deleteById(id: number) {
        return await prisma.phone.delete({
            where: { id }
        })
    }

    async deleteAll() {
        return await prisma.phone.deleteMany({})
    }

}