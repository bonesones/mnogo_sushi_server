import express from 'express';
import config from "dotenv/config"
import sequelize from './sequelize.js'
import * as mapping from "./models/mapping.js"
import cors from "cors"
import router from "./routes/index.js"
import ErrorHandler from "./middlewares/ErrorHandler.js"
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload"




const PORT = process.env.PORT || 3000;
const app = express()


app.use(cors({credentials: true, origin: process.env.CLIENT_URL}))
app.use(express.json())
app.use(fileUpload())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(express.static('static'))
app.use('/api', router)
app.use(ErrorHandler)


app.use('/', (req, res) => {
    res.status(200).send('all good')
})


const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()

        app.listen(PORT, '192.168.1.156',() => {
            console.log(`Server started on port ${PORT}`);
        })
    } catch(e) {
        console.log(e)
    }
}

start()

export default app

