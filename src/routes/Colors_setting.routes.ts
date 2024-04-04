import { Router } from "express";
import { checkAuth } from "../guards/checkAuth.guard";
import { ColorSettingController } from "../controllers/Colors_setting.controllers";

const router = Router();
const colorSettingController = new ColorSettingController();

router.get('/', colorSettingController.getColorSetting);
router.use(checkAuth)
router.post('/', colorSettingController.insertColorSetting);
router.put('/', colorSettingController.updateColorSetting);


export default router