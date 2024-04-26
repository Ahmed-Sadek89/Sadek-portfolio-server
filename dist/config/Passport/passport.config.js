"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const googleStrategy_config_1 = require("./googleStrategy.config");
const facebookStrategy_config_1 = require("./facebookStrategy.config");
const githubStrategy_config_1 = require("./githubStrategy.config");
const setPassportConfigration = (app) => {
    (0, googleStrategy_config_1.googleStrategy)();
    (0, facebookStrategy_config_1.facebookStrategy)();
    (0, githubStrategy_config_1.githubStrategy)();
    passport_1.default.serializeUser((user, done) => {
        done(null, user);
    });
    passport_1.default.deserializeUser((user, done) => {
        done(null, user || null);
    });
    app.use(passport_1.default.initialize());
    app.use(passport_1.default.session());
};
exports.default = setPassportConfigration;
