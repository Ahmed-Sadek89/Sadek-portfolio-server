import { ACTION, TABLE } from "@prisma/client";
import { createActivity } from "../libs/create-activity";
import prisma from "../libs/prisma";
import { JobTitle } from "../types";

export class JobTitlesServices {

    async getAll(awner_id: number) {
        const job_titles = await prisma.jobTitle.findMany({
            where: {
                awner_id
            }
        });
        return job_titles
    }

    async insertNewJobTitle(data: JobTitle) {
        const job_title = await prisma.jobTitle.create({
            data
        })
        await createActivity({
            action: ACTION.CREATE,
            table_name: TABLE.JOB_TITLES,
            awner_id: data.awner_id,
            table_name_id: ""
        })

        return job_title
    }

    async updateJobTitle(id: number, data: JobTitle) {
        const jobTitle = await prisma.jobTitle.update({
            where: { id },
            data
        })
        await createActivity({
            action: ACTION.UPDATE,
            table_name: TABLE.JOB_TITLES,
            awner_id: data.awner_id,
            table_name_id: id.toString()
        })

        return jobTitle
    }

    async deleteById(id: number, awner_id: number) {
        const jobTitle = await prisma.jobTitle.delete({
            where: { id }
        })
        await createActivity({
            action: ACTION.DELETE,
            table_name: TABLE.JOB_TITLES,
            awner_id,
            table_name_id: id.toString()
        })

        return jobTitle
    }

    async deleteAll() {
        return await prisma.jobTitle.deleteMany({})
    }

}