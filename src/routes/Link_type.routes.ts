import { Router } from "express";
import { LinksController } from "../controllers/Links.controller";
import { checkAuth } from "../guards/checkAuth.guard";

const router = Router();
const linksController = new LinksController()

// fix this page

router.get('/all', linksController.getByAwnerId);
router.use(checkAuth);
router.get('/:id', linksController.getById)
router.delete('/deleteAll', linksController.deleteAll)
router.delete('/:id', linksController.deleteById);
router.post('/', linksController.insertNewLink);
router.put('/:id', linksController.updateLink);


export default router