
import express,{ Request, Response, NextFunction} from 'express';
import sequelize from "./db/database.js";
import router from "./router/index.js";
import cors from "cors";
import cookieParser from 'cookie-parser';

import * as dotenv from 'dotenv';
dotenv.config();

const PORT = 8088;

export const app = express();



app.use(express.json());
app.use(cookieParser())

app.use(cors({
  origin: 'http://localhost:3000', 
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

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ PostgreSQL Connection has been established successfully.");
    
    await sequelize.sync();
    console.log("✅ Database synchronized.");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}/`);
    });

  } catch (err) {
    console.error("❌ Unable to start the server:", err);
  }
};

startServer();


   
