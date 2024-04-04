import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import AwnerRouters from './routes/Awner.routes'
import AwnerInfoRouters from './routes/Awner_info.routes';
import ColorsSettingRouters from './routes/Colors_setting.routes'

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
// multer
// links, 
// jobs_title, 
// phones

app.listen(process.env.PORT, () => {
    console.log(`SERVER IS WORKED ON PORT ${process.env.PORT}`,)
})