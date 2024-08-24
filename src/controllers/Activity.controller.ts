import { Request, Response } from "express";
import { ActivityService } from "../services/Activity.service";

const activityService = new ActivityService()
export class ActivityController {

    async createActivity(req: Request, res: Response) {
        const awner_id = req.body.awner_id as number;
        try {
            await activityService.createLogoutActivity(awner_id)
            res.status(200).json({
                status: 200
            })
        } catch (error: any) {
            console.log({ error: error.message })
            res.status(500).json({
                status: 500
            })
        }
    }

    
}