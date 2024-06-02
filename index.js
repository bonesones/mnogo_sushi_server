import express from 'express';
import config from "dotenv/config"
import sequelize from './sequelize.js'
import * as mapping from "./models/mapping.js"
import cors from "cors"
import router from "./routes/index.js"



const PORT = process.env.PORT || 3000;
const app = express()

app.use(express.json())
app.use(cors())
app.use('/api', router)


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

