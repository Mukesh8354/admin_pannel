// helper/averageHelper/averageDbHelper.js

import db from "../../config/mysql.js";

export const findAverageByCategory = async (category) => {
  const [rows] = await db.execute(
    "SELECT * FROM averages WHERE category = ? LIMIT 1",
    [category]
  );
  return rows[0] || null;
};

export const findAverageById = async (id) => {
  const [rows] = await db.execute("SELECT * FROM averages WHERE id = ?", [id]);
  return rows[0] || null;
};

export const getAverageRowsByAverageId = async (averageId) => {
  console.log("FETCH ROWS FOR AVG ID:", averageId);
  const [rows] = await db.execute(
    "SELECT * FROM average_rows WHERE average_id = ?",
    [averageId]
  );
  return rows;
};
