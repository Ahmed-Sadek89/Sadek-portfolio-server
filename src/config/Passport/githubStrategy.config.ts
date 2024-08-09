import passport, { Profile } from "passport";
import { Strategy as GithubStrategy } from 'passport-github2';
import { VisitorService } from "../../services/Visitor.service";
import { githubEnv } from "./env.config";
import { Prisma } from "@prisma/client";

const visitorService = new VisitorService();

export const githubStrategy = () => {
    return passport.use(
        new GithubStrategy(
            {
                clientID: githubEnv.GITHUB_CLIENT_ID,
                clientSecret: githubEnv.GITHUB_CLIENT_SECRET,
                callbackURL: githubEnv.GITHUB_CALLBACK_URL
            },
            async function (accessToken: string, refreshToken: string, profile: Profile, done: (error: any, user?: any, info?: any) => void) {
                try {
                    const visitor = await visitorService.getById((profile.id));
                    const data = {
                        id: profile.id,
                        name: profile.displayName,
                        email: profile.emails ? profile.emails[0].value : "",
                        image: profile.photos ? profile.photos[0].value : "",
                        login_by: "GitHub"
                    }
                    console.log({profile})
                    if (!visitor) {
                        const newVisitor = await visitorService.insert(data as Prisma.visitorCreateInput)
                        return done(null, newVisitor);
                    } else {
                        const newVisitor = await visitorService.updateById(profile.id, data);
                        return done(null, newVisitor);
                    }
                } catch (error: any) {
                    console.log("passport GitHub error: ", error.message);
                    return done(error);
                }
            }
        )
    );
}