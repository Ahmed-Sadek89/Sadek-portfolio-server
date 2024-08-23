import prisma from "../libs/prisma";
import { FuturePlan } from "../types";

export class PlanServices {

    async postPlan(data: FuturePlan) {
        return await prisma.futurePlan.create({
            data,
        })
    }

    async editPlanById(id: number, data: FuturePlan) {
        return await prisma.futurePlan.update({
            data,
            where: {
                id,
            }
        })
    }

    async deletePlanById(id: number) {
        return await prisma.futurePlan.delete({
            where: {
                id,
            }
        })
    }
}