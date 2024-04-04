import { Router } from "express";
import { checkAuth } from "../guards/checkAuth.guard";
import { AwnerInfoController } from "../controllers/Awner_info.controllers";

const router = Router();
const awnerInfoController = new AwnerInfoController();

router.get('/', awnerInfoController.getAwnerInfo);
router.use(checkAuth)
router.post('/', awnerInfoController.insertAwnerInfo);
router.put('/', awnerInfoController.updateAwnerInfo);


export default router