import Router from 'express';
import { CategoryProjectsController } from '../controllers/Category_projects.controllers';
import { checkAuth } from '../guards/checkAuth.guard';

const router = Router();
const categoryProjectsController = new CategoryProjectsController()

router.get("/getWithProjects/:id", categoryProjectsController.getWithProjects);
router.use(checkAuth);
router.get('/', categoryProjectsController.getAll)
router.get('/:id', categoryProjectsController.getById)

router.post('/', categoryProjectsController.insert);

router.put('/:id', categoryProjectsController.updateById);

router.delete('/:id', categoryProjectsController.deleteById);
router.delete('/', categoryProjectsController.deleteAll)


export default router;