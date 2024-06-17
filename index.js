import express from 'express';
import config from "dotenv/config"
import sequelize from './sequelize.js'
import * as mapping from "./models/mapping.js"
import cors from "cors"
import fileUpload from "express-fileupload"
import router from "./routes/index.js"
import ErrorHandler from "./middlewares/ErrorHandler.js"
import cookieParser from "cookie-parser";




const PORT = process.env.PORT || 3000;
const app = express()

console.log(process.env.CLIENT_URL)

app.use(express.json())
app.use(cors({credentials: true, origin: process.env.CLIENT_URL}))
app.use(fileUpload())
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
        await sequelize.sync({ alter: true })

        app.listen(PORT,() => {
            console.log(`Server started on port ${PORT}`);
        })
    } catch(e) {
        console.log(e)
    }
}

start()

export default app

