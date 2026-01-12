import db from "../../config/mysql.js";

export const createSchoolColorDB = async ({ schoolColor, description }) => {
  const [result] = await db.execute(
    "INSERT INTO school_colors (school_color, description) VALUES (?, ?)",
    [schoolColor, description]
  );
  return { id: result.insertId, schoolColor, description };
};

export const getSchoolColorsDB = async () => {
  const [rows] = await db.execute(`
    SELECT
      id,
      school_color AS schoolColor,
      description
    FROM school_colors
    ORDER BY school_color ASC
  `);
  return rows;
};

export const updateSchoolColorDB = async (id, { schoolColor, description }) => {
  await db.execute(
    "UPDATE school_colors SET school_color=?, description=? WHERE id=?",
    [schoolColor, description, id]
  );
  return { id, schoolColor, description };
};

export const deleteSchoolColorDB = async (id) => {
  await db.execute("DELETE FROM school_colors WHERE id=?", [id]);
};
