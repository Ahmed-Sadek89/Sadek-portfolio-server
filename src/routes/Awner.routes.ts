import { Router } from "express";
import { getAllAwners, getAwnerById, postAwnerController } from "../controllers/Awner.controllers";

const router = Router();

router.post('/', postAwnerController)
router.get('/getAll', getAllAwners)
router.get('/:id', getAwnerById)
router.put('/:id', (req, res) => { })
router.delete('/:id', (req, res) => { })
router.delete('/deleteAll', (req, res) => { })

export default router