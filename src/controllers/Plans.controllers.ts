import { Request, Response } from "express";
import { PlanServices } from "../services/Plans.service";
import { FuturePlan } from "../types";

const planService = new PlanServices()

export class PlansController {

    async postPlan(req: Request, res: Response) {
        const data = req.body as FuturePlan
        try {
            await planService.postPlan(data);
            res.status(200).json({
                status: 200,
                result: "new plan added successfully!"
            })
        } catch (error: any) {
            console.log({ error: error.message });
            res.status(500).json({
                status: 500,
                result: "something went wrong!"
            })
        }
    }

    async editPlanById(req: Request, res: Response) {
        const data = req.body as FuturePlan
        const id = Number(req.params.id)
        
        try {
            await planService.editPlanById(id, data);
            res.status(200).json({
                status: 200,
                result: `Plan num #${id} edited successfully!`
            })
        } catch (error: any) {
            console.log({ error: error.message });
            res.status(500).json({
                status: 500,
                result: "something went wrong!"
            })
        }
    }

    async deletePlanById(req: Request, res: Response) {
        const id = Number(req.params.id)
        const awner_id = Number(req.body.awner_id)
        try {
            await planService.deletePlanById(id, awner_id);
            res.status(200).json({
                status: 200,
                result: `Plan num #${id} deleted successfully!`
            })
        } catch (error: any) {
            console.log({ error: error.message });
            res.status(500).json({
                status: 500,
                result: "something went wrong!"
            })
        }
    }
}