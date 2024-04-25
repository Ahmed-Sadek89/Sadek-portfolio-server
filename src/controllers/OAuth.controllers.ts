import { Request, Response } from 'express';

export class OAuthController {

    getLoginSuccess(req: Request, res: Response) {
        res.status(200).json({
            success: true,
            message: "successfull",
            user: req.user,
            session: req.session
        });
    }

    getLoginFailed(req: Request, res: Response) {
        res.status(401).json({
            success: false,
            message: "failure",
        });
    }

    getLogout(req: Request, res: Response) {
        req.logout({}, (err) => console.log(err));
        res.redirect(process.env.PASSPORT_FRONTEND_REDIRECT_URL || "/");
    }
}