import Router from 'express';
import { CategoryProjectsController } from '../controllers/Category_projects.controllers';
import { checkAuth } from '../guards/checkAuth.guard';

const router = Router();
const categoryProjectsController = new CategoryProjectsController()

router.use(checkAuth);

router.get('/all', categoryProjectsController.all)
router.post('/', categoryProjectsController.insert);
router.put('/:id', categoryProjectsController.updateById);
router.delete('/:id', categoryProjectsController.deleteById);

export default router;