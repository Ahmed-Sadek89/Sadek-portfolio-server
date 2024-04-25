"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const dotenv_1 = __importDefault(require("dotenv"));
const Visitors_controllers_1 = require("../controllers/Visitors.controllers");
const checkAuth_guard_1 = require("../guards/checkAuth.guard");
dotenv_1.default.config();
const router = (0, express_1.default)();
const visitorController = new Visitors_controllers_1.VisitorController();
// default OAuth2
router.get("/login/success", visitorController.getLoginSuccess);
router.get("/login/failed", visitorController.getLoginFailed);
router.get("/logout", visitorController.getLogout);
// google strategy
router.get("/google", passport_1.default.authenticate("google", { scope: ["profile", 'email'] }));
router.get("/google/callback", passport_1.default.authenticate("google", {
    successRedirect: process.env.PASSPORT_FRONTEND_REDIRECT_URL || "/",
    failureRedirect: "/login/failed",
    session: true
}), function (req, res) {
    res.redirect(process.env.PASSPORT_FRONTEND_REDIRECT_URL || "/");
});
// github strategy
// facebook strategy
// other main routes related to CRUD and JOIN
router.use(checkAuth_guard_1.checkAuth);
router.get("/:id", visitorController.getById);
router.get("/", visitorController.getAll);
router.get("/messages/:id", visitorController.getMessagesByVisitorId);
router.get("/notes/:id", visitorController.getnotesByVisitorId);
router.delete("/:id", visitorController.deleteById);
router.delete("/", visitorController.deleteAll);
exports.default = router;
