import { Express } from 'express';
import passport from 'passport';
import { googleStrategy } from './googleStrategy.config';
import { facebookStrategy } from './facebookStrategy.config';
import { githubStrategy } from './githubStrategy.config';


const setPassportConfigration = (app: Express) => {
    googleStrategy();
    facebookStrategy();
    githubStrategy()
    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user || null);
    });
    app.use(passport.initialize());
    app.use(passport.session());
}

export default setPassportConfigration