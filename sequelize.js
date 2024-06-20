import { Sequelize } from "sequelize";
import pg from "pg";

export default new Sequelize(process.env.DB_CONNECT)



