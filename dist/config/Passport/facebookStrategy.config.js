"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.facebookStrategy = void 0;
const passport_1 = __importDefault(require("passport"));
const Visitor_service_1 = require("../../services/Visitor.service");
const env_config_1 = require("./env.config");
const passport_facebook_1 = require("passport-facebook");
const visitorService = new Visitor_service_1.VisitorService();
const facebookStrategy = () => {
    return passport_1.default.use(new passport_facebook_1.Strategy({
        clientID: env_config_1.facebookEnv.FACEBOOK_CLIENT_ID,
        clientSecret: env_config_1.facebookEnv.FACEBOOK_CLIENT_SECRET,
        callbackURL: env_config_1.facebookEnv.FACEBOOK_CALLBACK_URL,
        profileFields: ['id', 'displayName', 'photos', 'email']
    }, function (accessToken, refreshToken, profile, done) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const visitor = yield visitorService.getById((profile.id));
                const data = {
                    id: profile.id,
                    name: profile.displayName,
                    email: profile.emails ? profile.emails[0].value : "",
                    image: profile.photos ? profile.photos[0].value : "",
                    login_by: "Facebook"
                };
                console.log({ profile });
                if (!visitor) {
                    const newVisitor = yield visitorService.insert(data);
                    return done(null, newVisitor);
                }
                else {
                    const newVisitor = yield visitorService.updateById(profile.id, data);
                    return done(null, newVisitor);
                }
            }
            catch (error) {
                console.log("passport Facebook error: ", error.message);
                return done(error);
            }
        });
    }));
};
exports.facebookStrategy = facebookStrategy;
