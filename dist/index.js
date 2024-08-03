"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
// app.use(express.urlencoded({ extended: true }));
// app.use('/uploads', express.static('uploads'))
// app.use(
//     session({
//         secret: "secretcode",
//         resave: true,
//         saveUninitialized: true,
//         cookie: { // for HTTPS
//             sameSite: "none",
//             secure: true,
//             maxAge: 1000 * 60 * 60 * 24 * 7 // One Week
//         }
//     }))
// setPassportConfigration(app);
// app.use(cors());
app.get('/', (_, res) => {
    res.status(200).json({
        status: 200,
        message: "welcome to Nodejs server"
    });
});
// app.use("/api", root)
app.listen(process.env.PORT, () => {
    console.log(`SERVER IS WORKED ON PORT ${process.env.PORT}`);
});
