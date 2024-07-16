import mysql from "mysql";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: __dirname + "/./../../../.env" });

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    multipleStatements: true,
});

db.connect( (error) => {
    if(error){
        throw error;
    }
    console.log(`Connected to database [${process.env.DB_NAME}]`);
});

export default db;
