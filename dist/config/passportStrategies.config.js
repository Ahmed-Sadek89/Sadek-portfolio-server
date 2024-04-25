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
exports.passportGoogle = void 0;
const passport_1 = __importDefault(require("passport"));
const Visitor_service_1 = require("../services/Visitor.service");
const passport_google_oauth20_1 = require("passport-google-oauth20");
const visitorService = new Visitor_service_1.VisitorService();
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL;
const passportGoogle = () => {
    return passport_1.default.use(new passport_google_oauth20_1.Strategy({
        clientID: GOOGLE_CLIENT_ID || '',
        clientSecret: GOOGLE_CLIENT_SECRET || '',
        callbackURL: GOOGLE_CALLBACK_URL
    }, function (accessToken, refreshToken, profile, done) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const visitor = yield visitorService.getById((profile.id));
                if (!visitor) {
                    const data = {
                        id: profile.id,
                        name: profile.displayName,
                        email: profile.emails ? profile.emails[0].value : "",
                        image: profile.photos ? profile.photos[0].value : "",
                        login_by: "Gmail"
                    };
                    const newVisitor = yield visitorService.insert(data);
                    return done(null, newVisitor);
                }
                return done(null, visitor);
            }
            catch (error) {
                console.log("passport google error: ", error.message);
                return done(error);
            }
        });
    }));
};
exports.passportGoogle = passportGoogle;
