import Router from 'express';
import { CategorySkillsController } from '../controllers/Category_skills.controller';
import { checkAuth } from '../guards/checkAuth.guard';

const router = Router();
const categorySkillsController = new CategorySkillsController();


router.get('/all', checkAuth, categorySkillsController.getAll)
router.delete('/all', checkAuth, categorySkillsController.deleteAll);

router.post('/', checkAuth, categorySkillsController.insert);

router.get('/:id', checkAuth, categorySkillsController.getById)
router.put('/:id', checkAuth, categorySkillsController.updateById)
router.delete('/:id', checkAuth, categorySkillsController.deleteById);

router.get('/withItsSkills/:id', categorySkillsController.getByIdWithSkills);

export default router