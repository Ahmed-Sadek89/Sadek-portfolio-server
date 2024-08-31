import { ACTION, TABLE } from "@prisma/client";
import { createActivity } from "../libs/create-activity";
import prisma from "../libs/prisma";
import { Link } from "../types";

export class LinksServices {

    async getByAwnerId(awner_id: number) {
        const links = await prisma.link.findMany({
            where: {
                awner_id
            }
        });
        return links
    }

    async getById(id: number) {
        const link = await prisma.link.findUnique({
            where: {
                id
            }
        })
        return link
    }

    async getByLinkTypeAndAwnerId(link_type_id: number, awner_id: number) {
        const link = await prisma.link.findMany({
            where: {
                link_type_id,
                awner_id
            },
            include: {
                LinkType: {
                    select: {
                        link_type: true
                    }
                }
            }
        })
        return link
    }

    async insertNewLink(data: Link) {
        const link = await prisma.link.create({
            data
        })
        await createActivity({
            action: ACTION.CREATE,
            table_name: TABLE.LINKS,
            awner_id: data.awner_id,
            table_name_id: ""
        })

        return link
    }

    async updateLink(id: number, data: Link) {
        const link = await prisma.link.update({
            where: { id },
            data
        })
        await createActivity({
            action: ACTION.UPDATE,
            table_name: TABLE.LINKS,
            awner_id: data.awner_id,
            table_name_id: id.toString()
        })

        return link
    }

    async deleteById(id: number, awner_id: number) {
        const link = await prisma.link.delete({
            where: { id }
        })
        await createActivity({
            action: ACTION.DELETE,
            table_name: TABLE.LINKS,
            awner_id,
            table_name_id: id.toString()
        })

        return link
    }

}