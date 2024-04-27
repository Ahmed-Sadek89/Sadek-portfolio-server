import passport from "passport";
import Router from 'express';
import dotenv from 'dotenv';
dotenv.config();

const router = Router();

router.get("/", passport.authenticate("facebook", { scope: ["profile", "email"] }));
router.get(
    "/callback",
    passport.authenticate("facebook", {
        successRedirect: process.env.PASSPORT_FRONTEND_REDIRECT_URL,
        failureRedirect: "/login/failed",
        session: true
    }),
    function (req, res) {
        res.redirect(process.env.PASSPORT_FRONTEND_REDIRECT_URL || "/");
    }
);

export default router;