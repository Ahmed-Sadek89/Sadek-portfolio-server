import { ACTION, TABLE } from "@prisma/client";
import { createActivity } from "../libs/create-activity";
import prisma from "../libs/prisma";
import { Phone } from "../types";

export class PhonesServices {

    async getAll(awner_id: number) {
        const phones = await prisma.phone.findMany({
            where: { awner_id },
            select: {
                id: true,
                phone_number: true,
            },
        });
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
        await createActivity({
            action: ACTION.CREATE,
            table_name: TABLE.PHONES,
            awner_id: data.awner_id,
            table_name_id: ""
        })

        return phone
    }

    async updatePhone(id: number, data: Phone) {
        const phone = await prisma.phone.update({
            where: { id },
            data
        })
        await createActivity({
            action: ACTION.UPDATE,
            table_name: TABLE.PHONES,
            awner_id: data.awner_id,
            table_name_id: id.toString()
        })

        return phone
    }

    async deleteById(id: number, awner_id: number) {
        const phone = await prisma.phone.delete({
            where: { id, awner_id },
        })
        await createActivity({
            action: ACTION.DELETE,
            table_name: TABLE.PHONES,
            awner_id,
            table_name_id: id.toString()
        })

        return phone
    }

    async deleteAll() {
        return await prisma.phone.deleteMany({})
    }

}