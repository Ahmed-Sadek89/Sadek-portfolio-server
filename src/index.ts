import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import AwnerRouters from './routes/Awner.routes'
import AwnerInfoRouters from './routes/Awner_info.routes';
import ColorsSettingRouters from './routes/Colors_setting.routes'
import LinksRouters from './routes/Links.routes';
import jobTitleRouters from './routes/Job_title.routes';
import phonesRouters from './routes/Phone.routes';


dotenv.config()

const app = express();

app.use(express.json())

app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'))

app.use(cors());

app.get('/', (_, res) => {
    res.status(200).json({
        status: 200,
        message: "welcome to server"
    })
})

app.use('/api/awner', AwnerRouters)
app.use('/api/awner_info', AwnerInfoRouters)
app.use('/api/colors_setting', ColorsSettingRouters)
app.use('/api/links', LinksRouters)
// jobs_title, 
app.use('/api/jobs_title', jobTitleRouters)
// phones
app.use('/api/phones', phonesRouters)

app.listen(process.env.PORT, () => {
    console.log(`SERVER IS WORKED ON PORT ${process.env.PORT}`,)
})