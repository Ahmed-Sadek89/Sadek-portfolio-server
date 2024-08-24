import { Router } from "express";
import { checkAuth } from "../guards/checkAuth.guard";
import { ActivityController } from "../controllers/Activity.controller";

const router = Router();
const activityController = new ActivityController();


router.use(checkAuth);
router.post('/', activityController.createActivity)



export default router