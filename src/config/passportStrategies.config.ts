import passport from "passport";
import { VisitorService } from "../services/Visitor.service";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

const visitorService = new VisitorService();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL;

export const passportGoogle = () => {
    return passport.use(
        new GoogleStrategy(
            {
                clientID: GOOGLE_CLIENT_ID || '',
                clientSecret: GOOGLE_CLIENT_SECRET || '',
                callbackURL: GOOGLE_CALLBACK_URL
            },
            async function (accessToken, refreshToken, profile, done) {
                try {
                    const visitor = await visitorService.getById((profile.id));
                    if (!visitor) {
                        const data = {
                            id: profile.id,
                            name: profile.displayName,
                            email: profile.emails ? profile.emails[0].value : "",
                            image: profile.photos ? profile.photos[0].value : "",
                            login_by: "Gmail"
                        }
                        const newVisitor = await visitorService.insert(data)
                        return done(null, newVisitor);
                    }
                    return done(null, visitor);
                } catch (error: any) {
                    console.log("passport google error: ", error.message);
                    return done(error);
                }
            }
        )
    );
}