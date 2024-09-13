import { Router } from "express";
import { LinksController } from "../controllers/Links.controller";
import { checkAuth } from "../guards/checkAuth.guard";
import { upload } from "../config/multer.config";

const router = Router();
const linksController = new LinksController()


router.use(checkAuth);
router.get('/all/:awner_id', linksController.getByAwnerId);
router.get('/:link_type_id', linksController.getByLinkTypeAndAwnerId);
router.delete('/:id', linksController.deleteById);
router.post('/', upload.single('icon'), linksController.insertNewLink);
router.put('/:id', upload.single('icon'), linksController.updateLink);


export default router