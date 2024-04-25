import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import AwnerRouters from './routes/Awner.routes'
import AwnerInfoRouters from './routes/Awner_info.routes';
import ColorsSettingRouters from './routes/Colors_setting.routes'
import LinksRouters from './routes/Links.routes';
import jobTitleRouters from './routes/Job_title.routes';
import phonesRouters from './routes/Phone.routes';
import categorySkillsRouters from './routes/Category_skills.routes';
import skillsRouters from './routes/Skills.routes'
import categoryProjectsRouters from './routes/Category_projects.routes';

dotenv.config()

const app = express();

app.use(express.json())

app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'))

app.use(cors());

app.get('/', (_, res) => {
    res.status(200).json({
        status: 200,
        message: "welcome to Nodejs server"
    })
})

app.use('/api/awner', AwnerRouters)
app.use('/api/awner_info', AwnerInfoRouters)
app.use('/api/colors_setting', ColorsSettingRouters)
app.use('/api/links', LinksRouters)
app.use('/api/job_titles', jobTitleRouters)
app.use('/api/phones', phonesRouters)
app.use('/api/category_skills', categorySkillsRouters)
app.use('/api/skills', skillsRouters)
app.use('/api/category_projects', categoryProjectsRouters)
// projects
// project_notes

app.listen(process.env.PORT || 5000, () => {
    console.log(`SERVER IS WORKED ON PORT ${process.env.PORT}`)
})