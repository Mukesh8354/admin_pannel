// helper/componentCostHelper/componentCostDbHelper.js

import db from "../../config/mysql.js"; // mysql2 pool

export const checkComponentCostExists = async ({ category, school, size }) => {
  const [rows] = await db.query(
    `
    SELECT * 
    FROM component_costs
    WHERE category = ? AND school = ? AND size = ?
    LIMIT 1
    `,
    [category, school, size]
  );

  return rows[0] || null;
};
