import { Router } from "express";
import { checkAuth } from "../guards/checkAuth.guard";
import { PhonesController } from "../controllers/Phones.controller";

const router = Router();
const phonesController = new PhonesController()

router.use(checkAuth);
router.get('/all/:awner_id', phonesController.getAll);
router.get('/:id', phonesController.getById)
router.delete('/all', phonesController.deleteAll)
router.delete('/:id', phonesController.deleteById);
router.post('/', phonesController.insertNewPhone);
router.put('/:id', phonesController.updatePhone)

export default router