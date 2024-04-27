"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const passport_config_1 = __importDefault(require("./config/Passport/passport.config"));
const main_routes_1 = __importDefault(require("./main.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/uploads', express_1.default.static('uploads'));
app.use((0, express_session_1.default)({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
    cookie: {
        sameSite: "none",
        secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 7 // One Week
    }
}));
(0, passport_config_1.default)(app);
app.use((0, cors_1.default)());
app.get('/', (_, res) => {
    res.status(200).json({
        status: 200,
        message: "welcome to Nodejs server"
    });
});
app.use("/api", main_routes_1.default);
app.listen(process.env.PORT || 5000, () => {
    console.log(`SERVER IS WORKED ON PORT ${process.env.PORT}`);
});
