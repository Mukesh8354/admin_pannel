import mysql from "mysql2/promise";

const db = await mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "admin",
});

export default db;
