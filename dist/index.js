"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const Awner_routes_1 = __importDefault(require("./routes/Awner.routes"));
const Awner_info_routes_1 = __importDefault(require("./routes/Awner_info.routes"));
const Colors_setting_routes_1 = __importDefault(require("./routes/Colors_setting.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/uploads', express_1.default.static('uploads'));
app.use((0, cors_1.default)());
app.get('/', (_, res) => {
    res.status(200).json({
        status: 200,
        message: "welcome to server"
    });
});
app.use('/api/awner', Awner_routes_1.default);
app.use('/api/awner_info', Awner_info_routes_1.default);
app.use('/api/colors_setting', Colors_setting_routes_1.default);
// multer
// links, 
// jobs_title, 
// phones
app.listen(process.env.PORT, () => {
    console.log(`SERVER IS WORKED ON PORT ${process.env.PORT}`);
});
