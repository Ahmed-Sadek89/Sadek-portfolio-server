import { ACTION, TABLE } from "@prisma/client";
import { createActivity } from "../libs/create-activity";
import prisma from "../libs/prisma";
import { FuturePlan } from "../types";

export class PlanServices {

    async postPlan(data: FuturePlan) {
        const plan = await prisma.futurePlan.create({
            data,
        })
        await createActivity({
            action: ACTION.CREATE,
            table_name: TABLE.FUTURE_PLANS,
            awner_id: data.awner_id,
            table_name_id: ''
        })

        return plan
    }

    async editPlanById(id: number, data: FuturePlan) {
        const plan = await prisma.futurePlan.update({
            data,
            where: {
                id,
            }
        })
        await createActivity({
            action: ACTION.UPDATE,
            table_name: TABLE.FUTURE_PLANS,
            awner_id: data.awner_id,
            table_name_id: id.toString()
        })

        return plan
    }

    async deletePlanById(id: number, awner_id: number) {
        const plan = await prisma.futurePlan.delete({
            where: {
                id,
                awner_id
            }
        })
        await createActivity({
            action: ACTION.DELETE,
            table_name: TABLE.FUTURE_PLANS,
            awner_id,
            table_name_id: id.toString()
        })

        return plan
    }
}