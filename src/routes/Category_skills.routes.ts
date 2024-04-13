import Router from 'express';
import { CategorySkillsController } from '../controllers/Category_skills.controller';
import { checkAuth } from '../guards/checkAuth.guard';

const categorySkillsRouter = Router();
const categorySkillsController = new CategorySkillsController();

categorySkillsRouter
    .route('/:id/withItsSkills')
    .get(categorySkillsController.getByIdWithSkills);

categorySkillsRouter.use(checkAuth)

categorySkillsRouter
    .route('/all')
    .get(categorySkillsController.getAll)
    .delete(categorySkillsController.deleteAll);

categorySkillsRouter
    .route('/')
    .post(categorySkillsController.insert);

categorySkillsRouter
    .route('/:id')
    .get(categorySkillsController.getById)
    .put(categorySkillsController.updateById)
    .delete(categorySkillsController.deleteById);

export default categorySkillsRouter