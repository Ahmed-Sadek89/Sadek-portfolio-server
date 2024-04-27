"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
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
const Visitors_routes_1 = __importDefault(require("./routes/Visitors.routes"));
const Message_routes_1 = __importDefault(require("./routes/Message.routes"));
const ProjectNote_routes_1 = __importDefault(require("./routes/ProjectNote.routes"));
const root = (0, express_1.default)();
root.use('/awner', Awner_routes_1.default);
root.use('/awner_info', Awner_info_routes_1.default);
root.use('/colors_setting', Colors_setting_routes_1.default);
root.use('/links', Links_routes_1.default);
root.use('/job_titles', Job_title_routes_1.default);
root.use('/phones', Phone_routes_1.default);
root.use('/category_skills', Category_skills_routes_1.default);
root.use('/skills', Skills_routes_1.default);
root.use('/category_projects', Category_projects_routes_1.default);
root.use('/projects', Projects_routes_1.default);
root.use('/visitors', Visitors_routes_1.default);
root.use('/messages', Message_routes_1.default);
root.use('/project_notes', ProjectNote_routes_1.default);
exports.default = root;
