import express from 'express';
import AwnerRouters from './routes/Awner.routes'
import ColorsSettingRouters from './routes/Colors_setting.routes'
import LinksRouters from './routes/Links.routes';
import LinkTypeRouters from './routes/Link_type.routes';
import jobTitleRouters from './routes/Job_title.routes';
import phonesRouters from './routes/Phone.routes';
import categorySkillsRouters from './routes/Category_skills.routes';
import skillsRouters from './routes/Skills.routes'
import categoryProjectsRouters from './routes/Category_projects.routes';
import projectsRouters from './routes/Projects.routes';
import visitorRoutes from './routes/Visitors.routes';
import messageRoutes from './routes/Message.routes'
import projectNotesRoutes from './routes/ProjectNote.routes'
import plansRoutes from './routes/Plans.routes'
import activityRoutes from './routes/Activity.routes'

const root = express()

root.use('/awner', AwnerRouters)
root.use('/colors_setting', ColorsSettingRouters)
root.use('/link_type', LinkTypeRouters)
root.use('/link', LinksRouters)
root.use('/job_title', jobTitleRouters)
root.use('/phone', phonesRouters)
root.use('/category_skills', categorySkillsRouters)
root.use('/skills', skillsRouters)
root.use('/category_projects', categoryProjectsRouters)
root.use('/projects', projectsRouters)
root.use('/visitors', visitorRoutes)
root.use('/messages', messageRoutes)
root.use('/project_notes', projectNotesRoutes);
root.use('/plan', plansRoutes);
root.use('/activity', activityRoutes);

export default root