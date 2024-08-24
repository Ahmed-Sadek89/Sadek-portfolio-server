import { ACTION, TABLE } from "@prisma/client";
import { createActivity } from "../libs/create-activity";

export class ActivityService {
    async createLogoutActivity(awner_id: number) {
        return createActivity({
            action: ACTION.LOGOUT,
            table_name: TABLE.AWNER,
            table_name_id: "",
            awner_id
        })
    }
}