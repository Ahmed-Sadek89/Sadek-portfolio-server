import { Express } from 'express';
import passport from 'passport';
import { passportGoogle } from './passportStrategies.config';


const setPassportConfigration = (app: Express) => {
    passportGoogle();
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