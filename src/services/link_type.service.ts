import { ACTION, TABLE } from "@prisma/client";
import { createActivity } from "../libs/create-activity";
import prisma from "../libs/prisma";
import { LinkType } from "../types";

export class LinkTypeService {

    async getAllByAwnerId(awner_id: number) {
        return prisma.linkType.findMany({
            where: {
                awner_id
            }
        })
    }

    async insertLinkType(data: LinkType) {
        const linkType = await prisma.linkType.create({
            data
        })
        await createActivity({
            action: ACTION.CREATE,
            table_name: TABLE.LINK_TYPES,
            awner_id: data.awner_id,
            table_name_id: ""
        })

        return linkType
    }

    async updatelinkType(id: number, data: LinkType) {
        const linkType = await prisma.linkType.update({
            where: { id },
            data
        })
        await createActivity({
            action: ACTION.UPDATE,
            table_name: TABLE.LINK_TYPES,
            awner_id: data.awner_id,
            table_name_id: id.toString()
        })

        return linkType
    }

    async deleteById(id: number, awner_id: number) {
        const linkType = await prisma.linkType.delete({
            where: { id }
        })
        await createActivity({
            action: ACTION.DELETE,
            table_name: TABLE.LINK_TYPES,
            awner_id,
            table_name_id: id.toString()
        })

        return linkType
    }

}