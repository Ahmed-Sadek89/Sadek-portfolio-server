import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';


dotenv.config()
const app = express();

app.use(express.json())
app.use(cors());

app.get('/', (_, res) => {
    res.json({
        status: 200,
        message: "welcome to server"
    })
})

app.listen(process.env.PORT, () => {
    console.log(`SERVER IS WORKED ON PORT ${process.env.PORT}`, )
})