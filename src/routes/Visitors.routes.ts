import Router from 'express';
import googleRoutes from './google.routes'
import facebookRoutes from './facebook.routes'
import githubRoutes from './github.routes'
import { VisitorController } from '../controllers/Visitors.controllers';

import { checkAuth } from '../guards/checkAuth.guard';


const router = Router()
const visitorController = new VisitorController();

// default OAuth2
router.get("/login/success", visitorController.getLoginSuccess);
router.get("/login/failed", visitorController.getLoginFailed);
router.get("/logout", visitorController.getLogout);

// google strategy
router.use("/google", googleRoutes)

// github strategy
router.use("/github", githubRoutes);

// facebook strategy
router.use("/facebook", facebookRoutes)


// other main routes related to CRUD and JOIN
router.use(checkAuth);
router.get("/:id", visitorController.getById)
router.get("/", visitorController.getAll)
router.get("/messages/:id", visitorController.getMessagesByVisitorId)
router.get("/notes/:id", visitorController.getnotesByVisitorId)
router.delete("/:id", visitorController.deleteById)
router.delete("/", visitorController.deleteAll)

export default router