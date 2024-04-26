import passport from "passport";
import { VisitorService } from "../../services/Visitor.service";
import { facebookEnv, PASSPORT_CALLBACK_URL } from "./env.config";
import { Strategy as FacebookStrategy } from 'passport-facebook';

const visitorService = new VisitorService();

export const facebookStrategy = () => {
    return passport.use(
        new FacebookStrategy(
            {
                clientID: facebookEnv.FACEBOOK_CLIENT_ID,
                clientSecret: facebookEnv.FACEBOOK_CLIENT_SECRET,
                callbackURL: PASSPORT_CALLBACK_URL,
                profileFields: ['id', 'displayName', 'photos', 'email']
            },
            async function (accessToken, refreshToken, profile, done) {
                try {
                    const visitor = await visitorService.getById((profile.id));
                    const data = {
                        id: profile.id,
                        name: profile.displayName,
                        email: profile.emails ? profile.emails[0].value : "",
                        image: profile.photos ? profile.photos[0].value : "",
                        login_by: "Facebook"
                    }
                    if (!visitor) {
                        const newVisitor = await visitorService.insert(data)
                        return done(null, newVisitor);
                    } else {
                        const newVisitor = await visitorService.updateById(profile.id, data);
                        return done(null, newVisitor);
                    }
                } catch (error: any) {
                    console.log("passport Facebook error: ", error.message);
                    return done(error);
                }

            }
        )
    );
}