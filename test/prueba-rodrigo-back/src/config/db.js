import mysql from 'mysql2/promise'
import dotenv from 'dotenv'
dotenv.config()

export const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '12345678',
  database: process.env.DB_NAME || 'prueba_rodrigo',
  port: Number(process.env.DB_PORT) || 3306,
  decimalNumbers: true,
  charset: 'utf8mb4',
  connectionLimit: 10,
});

