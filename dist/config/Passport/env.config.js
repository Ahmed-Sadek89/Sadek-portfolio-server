"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PASSPORT_CALLBACK_URL = exports.githubEnv = exports.facebookEnv = exports.googleEnv = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "";
exports.googleEnv = {
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET
};
const FACEBOOK_CLIENT_ID = process.env.FACEBOOK_CLIENT_ID || "";
const FACEBOOK_CLIENT_SECRET = process.env.FACEBOOK_CLIENT_SECRET || "";
exports.facebookEnv = {
    FACEBOOK_CLIENT_ID,
    FACEBOOK_CLIENT_SECRET
};
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID || "";
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET || "";
exports.githubEnv = {
    GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET
};
exports.PASSPORT_CALLBACK_URL = process.env.PASSPORT_CALLBACK_URL || "";
