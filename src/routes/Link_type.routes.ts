import { Router } from "express";
import { checkAuth } from "../guards/checkAuth.guard";
import { LinkTypeController } from "../controllers/link_type.controller";

const router = Router();
const linkTypeController = new LinkTypeController()

// fix this page

router.use(checkAuth);
router.get('/all/:awner_id', linkTypeController.getAllByAwnerId);
router.post('/', linkTypeController.insertLinkType);
router.delete('/:id', linkTypeController.deleteById);
router.put('/:id', linkTypeController.updateLinkType);


export default router