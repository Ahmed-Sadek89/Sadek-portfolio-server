"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OAuthController = void 0;
class OAuthController {
    getLoginSuccess(req, res) {
        res.status(200).json({
            success: true,
            message: "successfull",
            user: req.user,
            session: req.session
        });
    }
    getLoginFailed(req, res) {
        res.status(401).json({
            success: false,
            message: "failure",
        });
    }
    getLogout(req, res) {
        req.logout({}, (err) => console.log(err));
        res.redirect(process.env.PASSPORT_FRONTEND_REDIRECT_URL || "/");
    }
}
exports.OAuthController = OAuthController;
