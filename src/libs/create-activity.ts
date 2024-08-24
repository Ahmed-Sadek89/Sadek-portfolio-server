import { ActivityCreation } from "../types";
import prisma from "./prisma";

export const createActivity = async (data: ActivityCreation) => {
    return await prisma.activity.create({
        data: {
            action: data.action,
            table_name: data.table_name,
            awner_id: data.awner_id,
            table_name_id: data.table_name_id
        }
    })
}