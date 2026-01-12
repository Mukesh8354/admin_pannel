// config/mysql.js
import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: "127.0.0.1", // 🔴 localhost मत लिखो
  user: "root",
  password: "", // XAMPP default
  database: "nk",
  port: 3306,
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
  connectTimeout: 10000, // 10 seconds
});

export default db;
