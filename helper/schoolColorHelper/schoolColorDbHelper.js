import db from "../../config/mysql.js";

export const checkDuplicateSchoolColor = async ({
  schoolColor,
  excludeId = null,
}) => {
  let sql = `
    SELECT id
    FROM school_colors
    WHERE LOWER(school_color) = LOWER(?)
  `;

  const values = [schoolColor];

  if (excludeId) {
    sql += " AND id != ?";
    values.push(Number(excludeId)); // 🔥 IMPORTANT
  }

  const [rows] = await db.execute(sql, values);
  return rows.length > 0;
};
