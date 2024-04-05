import { Router } from "express";
import { LinksController } from "../controllers/Links.controller";
import { checkAuth } from "../guards/checkAuth.guard";
import { upload } from "../config/multer.config";

const router = Router();
const linksController = new LinksController()


router.get('/getAll', linksController.getAll);
router.get('/getByType', linksController.getByLinkType);
router.use(checkAuth);
router.get('/:id', linksController.getById)
router.delete('/deleteAll', linksController.deleteAll)
router.delete('/:id', linksController.deleteById);
router.use(upload.single('icon'))
router.post('/', linksController.insertNewLink);
router.put('/:id', linksController.updateLink)


export default router