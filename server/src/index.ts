
import express,{ Request, Response, NextFunction} from 'express';
 import sequelize from "./db/database.js";
// import client from './db/database.js';
import router from "./router/index.js";
import cors from "cors";
import cookieParser from 'cookie-parser';

import 'dotenv/config';

const PORT = 8088;



export const app = express();

app.use(express.json());
app.use(cookieParser())

app.use(cors({
  origin: ['https://todo-list-postgress.vercel.app'],
  credentials: true,  
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use("/", router());



app.use((err: Error, req: Request, res: Response, _next: NextFunction): void => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
});



// startServer();
// sequelize.authenticate()
//   .then(() => {
//     console.log('Connection to the database has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log("✅ PostgreSQL Connection has been established successfully.");

        await sequelize.sync();
        console.log("✅ Database synchronized.");

        app.listen(PORT, () => {
            console.log(`Server running on https://task-list-server-5fsl.onrender.com/`);
        });

    } catch (err) {
        console.error("❌ Unable to start the server:", err);
    }
};

startServer();


   
