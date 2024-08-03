import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session';
import setPassportConfigration from './config/Passport/passport.config';
import root from './main.routes'

dotenv.config()

const app = express();

app.use(express.json())

app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'))
app.use(
    session({
        secret: "secretcode",
        resave: true,
        saveUninitialized: true,
        cookie: { // for HTTPS
            sameSite: "none",
            secure: true,
            maxAge: 1000 * 60 * 60 * 24 * 7 // One Week
        }
    }))

// setPassportConfigration(app);

// app.use(cors());

app.get('/', (_, res) => {
    res.status(200).json({
        status: 200,
        message: "welcome to Nodejs server"
    })
})

// app.use("/api", root)

app.listen(process.env.PORT, () => {
    console.log(`SERVER IS WORKED ON PORT ${process.env.PORT}`)
})