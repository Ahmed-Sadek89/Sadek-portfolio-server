import { Router } from "express";
import { checkAuth } from "../guards/checkAuth.guard";
import { PhonesController } from "../controllers/Phones.controller";

const router = Router();
const phonesController = new PhonesController()

router.get('/getAll', phonesController.getAll);
router.use(checkAuth);
router.get('/:id', phonesController.getById)
router.delete('/deleteAll', phonesController.deleteAll)
router.delete('/:id', phonesController.deleteById);
router.post('/', phonesController.insertNewPhone);
router.put('/:id', phonesController.updatePhone)

export default router