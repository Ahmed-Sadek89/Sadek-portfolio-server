import { ACTION, TABLE } from "@prisma/client";
import { createActivity } from "../libs/create-activity";
import prisma from "../libs/prisma";
import { CategoryProject } from "../types";

export class CategoryProjectsServices {


    async getAll(awner_id: number) {
        return await prisma.categoryProject.findMany({
            where: { awner_id }
        })
    }

    async insert(data: CategoryProject) {
        const category_project = await prisma.categoryProject.create({
            data
        })
        await createActivity({
            action: ACTION.CREATE,
            table_name: TABLE.CATEGORY_PROJECTS,
            awner_id: data.awner_id,
            table_name_id: ""
        })

        return category_project
    }

    async updateById(data: CategoryProject, id: number) {
        const category_project = await prisma.categoryProject.update({
            where: { id },
            data
        })
        await createActivity({
            action: ACTION.UPDATE,
            table_name: TABLE.CATEGORY_PROJECTS,
            awner_id: data.awner_id,
            table_name_id: id.toString()
        })

        return category_project
    }

    async deleteById(id: number, awner_id: number) {
        const category_project = await prisma.categoryProject.delete({
            where: { id }
        })

        await createActivity({
            action: ACTION.UPDATE,
            table_name: TABLE.CATEGORY_PROJECTS,
            awner_id,
            table_name_id: id.toString()
        })

        return category_project
    }

}