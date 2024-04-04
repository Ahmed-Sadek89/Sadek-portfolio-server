import { Router } from "express";
import { checkAuth } from "../guards/checkAuth.guard";
import { AwnerInfoController } from "../controllers/Awner_info.controllers";
import { upload } from "../config/multer.config";

const router = Router();
const awnerInfoController = new AwnerInfoController();

router.get('/', awnerInfoController.getAwnerInfo);
router.use(checkAuth);
router.use(upload.single('image'));
router.post('/', awnerInfoController.insertAwnerInfo);
router.put('/', awnerInfoController.updateAwnerInfo);


export default router