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
const Links_routes_1 = __importDefault(require("./routes/Links.routes"));
const Job_title_routes_1 = __importDefault(require("./routes/Job_title.routes"));
const Phone_routes_1 = __importDefault(require("./routes/Phone.routes"));
const Category_skills_routes_1 = __importDefault(require("./routes/Category_skills.routes"));
const Skills_routes_1 = __importDefault(require("./routes/Skills.routes"));
const Category_projects_routes_1 = __importDefault(require("./routes/Category_projects.routes"));
const Projects_routes_1 = __importDefault(require("./routes/Projects.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/uploads', express_1.default.static('uploads'));
app.use((0, cors_1.default)());
app.get('/', (_, res) => {
    res.status(200).json({
        status: 200,
        message: "welcome to Nodejs server"
    });
});
app.use('/api/awner', Awner_routes_1.default);
app.use('/api/awner_info', Awner_info_routes_1.default);
app.use('/api/colors_setting', Colors_setting_routes_1.default);
app.use('/api/links', Links_routes_1.default);
app.use('/api/job_titles', Job_title_routes_1.default);
app.use('/api/phones', Phone_routes_1.default);
app.use('/api/category_skills', Category_skills_routes_1.default);
app.use('/api/skills', Skills_routes_1.default);
app.use('/api/category_projects', Category_projects_routes_1.default);
app.use('/api/projects', Projects_routes_1.default);
// visitors
// messages
// project_notes
app.listen(process.env.PORT || 5000, () => {
    console.log(`SERVER IS WORKED ON PORT ${process.env.PORT}`);
})
