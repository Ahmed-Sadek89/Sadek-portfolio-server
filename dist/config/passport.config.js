"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passportStrategies_config_1 = require("./passportStrategies.config");
const setPassportConfigration = (app) => {
    (0, passportStrategies_config_1.passportGoogle)();
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
