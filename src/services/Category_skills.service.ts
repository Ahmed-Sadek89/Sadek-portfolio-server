import { ACTION, TABLE } from "@prisma/client";
import { createActivity } from "../libs/create-activity";
import prisma from "../libs/prisma";
import { CategorySkill } from "../types";

export class CategorySkillsServices {

    async getAll(awner_id: number) {
        return (await prisma.categorySkill.findMany({
            orderBy: {
                id: 'asc'
            },
            where: { awner_id }
        }));
    }

    async insert(data: CategorySkill) {
        const category = await prisma.categorySkill.create({
            data
        })
        await createActivity({
            action: ACTION.CREATE,
            table_name: TABLE.CATEGORY_SKILLS,
            awner_id: data.awner_id,
            table_name_id: ""
        })

        return category
    }

    async deleteById(id: number, awner_id: number) {
        const category = await prisma.categorySkill.delete({
            where: { id }
        })
        await createActivity({
            action: ACTION.DELETE,
            table_name: TABLE.CATEGORY_SKILLS,
            awner_id,
            table_name_id: id.toString()
        })
        return category
    }

    async updateById(id: number, data: CategorySkill) {
        const category = await prisma.categorySkill.update({
            where: { id },
            data
        })
        await createActivity({
            action: ACTION.UPDATE,
            table_name: TABLE.CATEGORY_SKILLS,
            awner_id: data.awner_id,
            table_name_id: id.toString()
        })
        return category
    }
}