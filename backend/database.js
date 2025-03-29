import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();


const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise();


export async function getResults() {
    const [rows] = await pool.query('SELECT * FROM results');
    return rows;
}

export async function Append(name, question1, question2, question3, question4, question5) {
    const [results] = await pool.query(`
        INSERT INTO results (name, question1, question2, question3, question4, question5)
        VALUES (?, ?, ?, ?, ?, ?)`, [name, question1, question2, question3, question4, question5])
        return results;
}