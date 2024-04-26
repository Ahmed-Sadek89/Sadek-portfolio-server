"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const router = (0, express_1.default)();
router.get("/", passport_1.default.authenticate("github", { scope: ["profile"] }));
router.get("/callback", passport_1.default.authenticate("github", {
    successRedirect: process.env.PASSPORT_FRONTEND_REDIRECT_URL || "/",
    failureRedirect: "/login/failed",
    session: true
}), function (req, res) {
    res.redirect(process.env.PASSPORT_FRONTEND_REDIRECT_URL || "/");
});
exports.default = router;
