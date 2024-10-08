import passport from "passport";
import { VisitorService } from "../../services/Visitor.service";
import { facebookEnv } from "./env.config";
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Visitor } from "../../types";

const visitorService = new VisitorService();

export const facebookStrategy = () => {
    return passport.use(
        new FacebookStrategy(
            {
                clientID: facebookEnv.FACEBOOK_CLIENT_ID,
                clientSecret: facebookEnv.FACEBOOK_CLIENT_SECRET,
                callbackURL: facebookEnv.FACEBOOK_CALLBACK_URL,
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
                    console.log({profile})
                    if (!visitor) {
                        const newVisitor = await visitorService.insert(data as Visitor)
                        return done(null, newVisitor);
                    } else {
                        const newVisitor = await visitorService.updateById(profile.id, data as Visitor);
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