import Router from 'express';
import { SkillsController } from '../controllers/Skills.controller';
import { checkAuth } from '../guards/checkAuth.guard';
import { upload } from '../config/multer.config';

const router = Router();
const skillsController = new SkillsController()

router.use(checkAuth)

router.get('/all/:awner_id', skillsController.getByAwnerId)
router.get('/:category_id', skillsController.getByCategoryId)
router.post('/', upload.single("icon"), skillsController.insert)
router.put('/:id', upload.single("icon"), skillsController.updateById)
router.delete('/:id', skillsController.deleteById)

export default router