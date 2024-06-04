import express from 'express';
import config from "dotenv/config"
import sequelize from './sequelize.js'
import * as mapping from "./models/mapping.js"
import cors from "cors"
import fileUpload from "express-fileupload"
import router from "./routes/index.js"
import ErrorHandler from "./middlware/ErrorHandler.js"




const PORT = process.env.PORT || 3000;
const app = express()

app.use(express.json())
app.use(cors())
app.use(fileUpload())
app.use(express.static('static'))
app.use('/api', router)
app.use(ErrorHandler)


const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()

        app.listen(PORT,() => {
            console.log(`Server started on port ${PORT}`);
        })
    } catch(e) {
        console.log(e)
    }
}

start()

