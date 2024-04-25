import Router from 'express';
import { checkAuth } from '../guards/checkAuth.guard';
import { upload } from '../config/multer.config';
import { ProjectController } from '../controllers/Projects.controller';

const router = Router();
const projectController = new ProjectController();
//

router.get('/', projectController.getAll);
router.get('/:id', projectController.getById);
router.use(checkAuth);
router.post('/', upload.single("attachment"), projectController.insert);
router.put('/:id', upload.single("attachment"), projectController.updateById);
router.delete("/:id", projectController.deleteById);
router.delete("/categoryId/:categoryId", projectController.deleteAllByCategoryId)
router.get("/notesByProjectId/:id", projectController.getProjectNotesByProjectId)


export default router;