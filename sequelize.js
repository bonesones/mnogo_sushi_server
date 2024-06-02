import { Sequelize } from "sequelize";

export default new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        dialect: "postgres",
        port: process.env.DB_PORT,
        host: process.env.DB_HOST,
    }
)