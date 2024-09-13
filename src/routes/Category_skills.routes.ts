import Router from 'express';
import { CategorySkillsController } from '../controllers/Category_skills.controller';
import { checkAuth } from '../guards/checkAuth.guard';

const router = Router();
const categorySkillsController = new CategorySkillsController();


router.use(checkAuth)
router.get('/all', categorySkillsController.getAll)
router.post('/', categorySkillsController.insert);
router.put('/:id', categorySkillsController.updateById)
router.delete('/:id', categorySkillsController.deleteById);

export default router