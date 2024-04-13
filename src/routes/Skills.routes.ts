import Router from 'express';
import { SkillsController } from '../controllers/Skills.controller';
import { checkAuth } from '../guards/checkAuth.guard';
import { upload } from '../config/multer.config';

const router = Router();
const skillsController = new SkillsController()

router.use(checkAuth)

router.get('/:id', skillsController.getById)
router.put('/:id', skillsController.updateById)
router.delete('/:id', skillsController.deleteById)

router.post('/', upload.single("icon"), skillsController.insert)

router.delete('/all/:category_id', skillsController.deleteById)

export default router