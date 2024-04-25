import Router from 'express';
import passport from 'passport';
import dotenv from 'dotenv';
import { VisitorController } from '../controllers/Visitors.controllers';
import { checkAuth } from '../guards/checkAuth.guard';

dotenv.config()

const router = Router()
const visitorController = new VisitorController();

// default OAuth2
router.get("/login/success", visitorController.getLoginSuccess);
router.get("/login/failed", visitorController.getLoginFailed);
router.get("/logout", visitorController.getLogout);

// google strategy
router.get("/google", passport.authenticate("google", { scope: ["profile", 'email'] }));
router.get(
    "/google/callback",
    passport.authenticate("google", {
        successRedirect: process.env.PASSPORT_FRONTEND_REDIRECT_URL || "/",
        failureRedirect: "/login/failed",
        session: true
    }),
    function (req, res) {
        res.redirect(process.env.PASSPORT_FRONTEND_REDIRECT_URL || "/");
    }
);

// github strategy

// facebook strategy


// other main routes related to CRUD and JOIN
router.use(checkAuth);
router.get("/:id", visitorController.getById)
router.get("/", visitorController.getAll)
router.get("/messages/:id", visitorController.getMessagesByVisitorId)
router.get("/notes/:id", visitorController.getnotesByVisitorId)
router.delete("/:id", visitorController.deleteById)
router.delete("/", visitorController.deleteAll)

export default router