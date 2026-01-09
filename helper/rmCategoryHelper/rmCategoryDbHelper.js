// helper/rmCategoryHelper/rmCategoryDbHelper.js
import db from "../../config/mysql.js";

/* ================= CREATE ================= */
export const createRMCategoryDB = async ({ category, description }) => {
  const [result] = await db.query(
    `
    INSERT INTO rm_categories (category, description)
    VALUES (?, ?)
    `,
    [category, description]
  );

  return {
    id: result.insertId,
    category,
    description,
  };
};

/* ================= GET ALL ================= */
export const getRMCategoriesDB = async () => {
  const [rows] = await db.query(
    `
    SELECT
      id,
      category,
      description,
      created_at,
      updated_at
    FROM rm_categories
    ORDER BY created_at DESC
    `
  );

  return rows;
};

/* ================= FIND BY ID ================= */
export const findRMCategoryById = async (id) => {
  const [rows] = await db.query(`SELECT * FROM rm_categories WHERE id = ?`, [
    id,
  ]);

  return rows.length ? rows[0] : null;
};

/* ================= DELETE ================= */
export const deleteRMCategoryDB = async (id) => {
  const [result] = await db.query(`DELETE FROM rm_categories WHERE id = ?`, [
    id,
  ]);

  return result.affectedRows > 0;
};

/* ================= UPDATE ================= */
export const updateRMCategoryDB = async (id, { category, description }) => {
  const [result] = await db.query(
    `
    UPDATE rm_categories
    SET category = ?, description = ?
    WHERE id = ?
    `,
    [category, description, id]
  );

  if (!result.affectedRows) return null;

  return await findRMCategoryById(id);
};

/* ================= DUPLICATE CHECK ================= */
export const checkDuplicateRMCategory = async (
  category,
  description,
  excludeId = null
) => {
  let sql = `
    SELECT id FROM rm_categories
    WHERE (
      LOWER(category) = LOWER(?)
    )
  `;

  const params = [category, description || "", description || "", category];

  if (excludeId) {
    sql += " AND id != ?";
    params.push(excludeId);
  }

  const [rows] = await db.query(sql, params);
  return rows.length > 0;
};
