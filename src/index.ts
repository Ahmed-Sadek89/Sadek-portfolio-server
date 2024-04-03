import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import AwnerRouters from './routes/Awner.routes'

dotenv.config()
const app = express();

app.use(express.json())
app.use(cors());

app.get('/', (_, res) => {
    res.status(200).json({
        status: 200,
        message: "welcome to server"
    })
})

app.use('/api/awner', AwnerRouters)

app.listen(process.env.PORT, () => {
    console.log(`SERVER IS WORKED ON PORT ${process.env.PORT}`, )
})