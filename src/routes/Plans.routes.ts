import { Router } from 'express';
import { checkAuth } from '../guards/checkAuth.guard';
import { PlansController } from '../controllers/Plans.controllers';

const plansController = new PlansController()
const router = Router();

router.use(checkAuth);

router.post("/", plansController.postPlan)
router.put("/:id", plansController.editPlanById)
router.delete("/:id", plansController.deletePlanById)


export default router