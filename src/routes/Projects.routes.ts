import Router from 'express';
import { checkAuth } from '../guards/checkAuth.guard';
import { upload } from '../config/multer.config';
import { ProjectController } from '../controllers/Projects.controller';

const router = Router();
const projectController = new ProjectController();
//

router.use(checkAuth);
router.get('/all', projectController.all);
router.get('/:id', projectController.getById);
router.get('/category_skill/:category_skill_id', projectController.getByCategorySkillId);
router.get('/skill/:skill_id', projectController.getBySkillId);
router.get('/category_project/:category_project_id', projectController.getByCategoryProjectId);
// router.get("/notesByProjectId/:id", projectController.getProjectNotesByProjectId)

router.delete("/:id", projectController.deleteById);
router.delete("/categoryId/:categoryId", projectController.deleteAllByCategoryId)
router.post('/', upload.single("attachment"), projectController.insert);
router.put('/:id', upload.single("attachment"), projectController.updateById);


export default router;