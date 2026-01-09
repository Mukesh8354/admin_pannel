import db from "../../config/mysql.js";

/* ================= CREATE ================= */
export const createSizeDB = async ({ category, size }) => {
  const sql = `
    INSERT INTO sizes (category, size)
    VALUES (?, ?)
  `;

  const [result] = await db.query(sql, [category, size]);

  return {
    id: result.insertId,
    category,
    size,
  };
};

/* ================= DUPLICATE CHECK ================= */
export const checkDuplicateSize = async ({
  category,
  size,
  excludeId = null,
}) => {
  let sql = `
    SELECT id
    FROM sizes
    WHERE category = ?
      AND size = ?
  `;

  const params = [category, size];

  if (excludeId) {
    sql += " AND id != ?";
    params.push(excludeId);
  }

  const [rows] = await db.query(sql, params);
  return rows.length > 0;
};

/* ================= GET ALL ================= */
export const getSizesDB = async () => {
  const [rows] = await db.query(`
    SELECT
      id,
      category,
      size,
      description,
      created_at
    FROM sizes
    ORDER BY created_at DESC
  `);

  return rows;
};

/* ================= UPDATE ================= */
export const updateSizeDB = async (id, { category, size }) => {
  const [result] = await db.query(
    `
    UPDATE sizes
    SET category = ?, size = ?
    WHERE id = ?
    `,
    [category, size, id]
  );

  if (result.affectedRows === 0) return null;

  const [rows] = await db.query("SELECT * FROM sizes WHERE id = ?", [id]);

  return rows[0];
};

/* ================= DELETE ================= */
export const deleteSizeDB = async (id) => {
  const [result] = await db.query("DELETE FROM sizes WHERE id = ?", [id]);

  return result.affectedRows > 0;
};
