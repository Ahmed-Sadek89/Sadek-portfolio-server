import { Router } from "express";
import { AwnerController } from "../controllers/Awner.controllers";
import { checkAuth } from "../guards/checkAuth.guard";

const router = Router();
const awnerController = new AwnerController();

router.post('/register', awnerController.registerAwnerController)
router.post('/login', awnerController.loginAwnerController)
router.get('/getAll', checkAuth, awnerController.getAllAwners)
router.get('/:id', checkAuth, awnerController.getAwnerById)
router.delete('/distroy', checkAuth, awnerController.deleteAllAwnersController)
router.delete('/:id', checkAuth, awnerController.deleteAwnerByIdController)
router.put('/:id', checkAuth, awnerController.updateAwnerById)


export default router