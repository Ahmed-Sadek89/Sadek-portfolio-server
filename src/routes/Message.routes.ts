import Router from 'express';
import { MessageController } from '../controllers/Message.controller';
import { checkAuth } from '../guards/checkAuth.guard';

const messageContoller = new MessageController()

const router = Router();

router.post('/', messageContoller.insert);
router.get('/', checkAuth, messageContoller.getAll)
router.get('/:id', checkAuth, messageContoller.getById)
router.get('/visitor/:visitor_id', checkAuth, messageContoller.getAllByVisitorId)
router.delete('/', checkAuth, messageContoller.deleteAll)
router.delete('/:id', checkAuth, messageContoller.deleteById)
router.delete('/visitor/:visitor_id', checkAuth, messageContoller.deleteAllByVisitorId)

export default router