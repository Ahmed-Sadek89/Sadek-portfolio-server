import { Router } from "express";
import { checkAuth } from "../guards/checkAuth.guard";
import { JobTitlesController } from "../controllers/Job_title.controller";

const router = Router();
const jobTitlesController = new JobTitlesController()

router.use(checkAuth);
router.get('/all/:awner_id', jobTitlesController.getAll);
router.delete('/all', jobTitlesController.deleteAll)
router.delete('/:id', jobTitlesController.deleteById);
router.post('/', jobTitlesController.insertNewJobTitle);
router.put('/:id', jobTitlesController.updateJobTitle)

export default router