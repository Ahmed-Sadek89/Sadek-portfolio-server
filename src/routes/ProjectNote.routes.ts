import Router from "express";
import { ProjectNoteController } from "../controllers/ProjectNote.controller";
import { checkAuth } from "../guards/checkAuth.guard";

const projectNoteController = new ProjectNoteController();

const router = Router();


router.post("/", projectNoteController.insert);

router.get('/', checkAuth, projectNoteController.getAll);
router.get('/:id', checkAuth, projectNoteController.getById);
router.get('/visitor/:visitor_id', checkAuth, projectNoteController.getAllByVisitorId);
router.get('/project/:project_id', checkAuth, projectNoteController.getAllByProjectId);

router.delete('/', checkAuth, projectNoteController.deleteAll);
router.delete('/:id', checkAuth, projectNoteController.deleteById);
router.delete('/visitor/:visitor_id', checkAuth, projectNoteController.deleteAllByVisitorId);
router.delete('/project/:project_id', checkAuth, projectNoteController.deleteAllByProjectId);


export default router