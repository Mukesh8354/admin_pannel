import db from "../../config/mysql.js";

export const checkDuplicateSchoolColor = async ({
  schoolColor,
  description,
  excludeId = null,
}) => {
  let sql = `
    SELECT id FROM school_colors
    WHERE (
      LOWER(schoolColor) = ?
    )
  `;

  const values = [
    schoolColor,
    description || "",
    description || "",
    schoolColor,
  ];

  if (excludeId) {
    sql += " AND id != ?";
    values.push(excludeId);
  }

  const [rows] = await db.execute(sql, values);
  return rows.length > 0;
};
