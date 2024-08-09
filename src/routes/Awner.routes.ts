import { Router } from "express";
import { AwnerController } from "../controllers/Awner.controllers";
import { checkAuth } from "../guards/checkAuth.guard";
import { upload } from "../config/multer.config";

const router = Router();
const awnerController = new AwnerController();

router.post('/login', awnerController.loginAwnerController)
router.post('/register', upload.single('image'), awnerController.registerAwnerController)
router.get('/get/prime', awnerController.getPrimeAwner)
router.use(checkAuth);
router.get('/getAll', awnerController.getAllAwners)
router.get('/:id', awnerController.getAwnerById)
router.delete('/distroy', awnerController.deleteAllAwnersController)
router.delete('/:id', awnerController.deleteAwnerByIdController)
router.put('/:id', upload.single('image'), awnerController.updateAwnerById)


export default router