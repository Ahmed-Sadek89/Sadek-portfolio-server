import { ACTION, TABLE } from "@prisma/client";
import { createActivity } from "../libs/create-activity";
import prisma from "../libs/prisma";
import { Skills } from "../types";


export class SkillsServices {

    async getByCategoryId(category_id: number) {
        return await prisma.skill.findMany({
            where: { category_id },
            include: {
                CategorySkill: {
                    select: {
                        category_name: true
                    }
                }
            }
        })
    }

    async getByAwnerId(awner_id: number) {
        const links = await prisma.skill.findMany({
            where: {
                awner_id
            },
            include: {
                CategorySkill: {
                    select: {
                        id: true,
                        category_name: true
                    }
                }
            }
        });
        return links
    }


    async getById(id: number) {
        return await prisma.skill.findUnique({
            where: { id }
        })
    }

    async insert(data: Skills) {
        const newSkill = await prisma.skill.create({
            data
        })
        await createActivity({
            action: ACTION.CREATE,
            table_name: TABLE.SKILLS,
            awner_id: data.awner_id,
            table_name_id: ""
        })

        return newSkill;
    }

    async updateById(id: number, data: Skills) {
        const skill = await prisma.skill.update({
            where: { id },
            data
        })
        await createActivity({
            action: ACTION.UPDATE,
            table_name: TABLE.SKILLS,
            awner_id: data.awner_id,
            table_name_id: id.toString()
        })
        return skill
    }

    async deleteById(id: number, awner_id: number) {
        const skill = await prisma.skill.delete({
            where: { id }
        })
        await createActivity({
            action: ACTION.UPDATE,
            table_name: TABLE.SKILLS,
            awner_id,
            table_name_id: id.toString()
        })
        return skill
    }

    async deleteByCategoryId(category_id: number) {
        return await prisma.skill.deleteMany({
            where: { category_id }
        })
    }
}