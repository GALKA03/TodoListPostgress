import pkg from 'pg';
const { Client } = pkg;
import 'dotenv/config';
const client = new Client({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PASSWORD,
    port: Number(process.env.POSTGRES_PORT),
});
client.connect((err) => {
    if (err) {
        console.error('Failed to connect:', err);
        throw err;
    }
    console.log("Connected to PostgreSQL successfully!");
});
export default client;
//# sourceMappingURL=database.js.map