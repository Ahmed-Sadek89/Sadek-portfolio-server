import passport from "passport";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { VisitorService } from "../../services/Visitor.service";
import { googleEnv } from "./env.config";

const visitorService = new VisitorService();


export const googleStrategy = () => {
    return passport.use(
        new GoogleStrategy(
            {
                clientID: googleEnv.GOOGLE_CLIENT_ID || '',
                clientSecret: googleEnv.GOOGLE_CLIENT_SECRET || '',
                callbackURL: googleEnv.GOOGLE_CALLBACK_URL || ""
            },
            async function (accessToken, refreshToken, profile, done) {
                try {
                    const visitor = await visitorService.getById((profile.id));
                    const data = {
                        id: profile.id,
                        name: profile.displayName,
                        email: profile.emails ? profile.emails[0].value : "",
                        image: profile.photos ? profile.photos[0].value : "",
                        login_by: "Gmail"
                    }
                    if (!visitor) {
                        const newVisitor = await visitorService.insert(data)
                        return done(null, newVisitor);
                    } else {
                        const newVisitor = await visitorService.updateById(profile.id, data);
                        return done(null, newVisitor);
                    }
                } catch (error: any) {
                    console.log("passport google error: ", error.message);
                    return done(error);
                }
            }
        )
    );
}