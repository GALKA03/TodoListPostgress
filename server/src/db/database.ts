import { Sequelize } from 'sequelize-typescript';
import User from "../models/userModel.js";
import TasksModel from "../models/tasksModel.js";
import 'dotenv/config';

const sequelize = new Sequelize({
    dialect: 'postgres',
    protocol: 'postgres',
    logging: false,
    database: process.env.PG_DB,
    username: process.env.PG_USERNAME,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    port: Number(process.env.PG_PORT),
    models: [User, TasksModel],
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});

if (!process.env.PG_DB) console.log("PG_DB is missing");
if (!process.env.PG_USERNAME) console.log("PG_USERNAME is missing");
if (!process.env.PG_PASSWORD) console.log("PG_PASSWORD is missing");
if (!process.env.PG_HOST) console.log("PG_HOST is missing");
if (!process.env.PG_PORT) console.log("PG_PORT is missing");

if (!process.env.PG_DB || !process.env.PG_USERNAME || !process.env.PG_PASSWORD || !process.env.PG_HOST || !process.env.PG_PORT) {
    throw new Error("Please ensure all Postgres environment variables are set!");
}




 export default sequelize;




