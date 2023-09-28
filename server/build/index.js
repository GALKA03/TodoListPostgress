import express from 'express';
import client from './db/database.js';
import router from "./router/index.js";
import cors from "cors";
import cookieParser from 'cookie-parser';
import 'dotenv/config';
const PORT = 8088;
export const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use("/", router());
app.use((err, req, res, _next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});
const startServer = async () => {
    try {
        client.query('SELECT NOW()', (err) => {
            if (err) {
                throw err;
            }
            console.log("✅ PostgreSQL Connection has been established successfully.");
            app.listen(PORT, () => {
                console.log(`Server running on http://localhost:${PORT}/`);
            });
        });
    }
    catch (err) {
        console.error("❌ Unable to start the server:", err);
    }
};
startServer();
//# sourceMappingURL=index.js.map