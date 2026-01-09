import db from "../../config/mysql.js";

/* ================= GET BY CATEGORY ================= */
export const getSizeGroupByCategory = async (category) => {
  const [rows] = await db.query(
    "SELECT * FROM size_groups WHERE category = ?",
    [category]
  );

  if (!rows.length) return null;

  return {
    ...rows[0],
    sizes: JSON.parse(rows[0].sizes),
  };
};

/* ================= CREATE ================= */
export const createSizeGroupDB = async ({ category, sizes }) => {
  const sql = `
    INSERT INTO size_groups (category, sizes)
    VALUES (?, ?)
  `;

  const [result] = await db.query(sql, [category, JSON.stringify(sizes)]);

  return {
    id: result.insertId,
    category,
    sizes,
  };
};

/* ================= MERGE SIZES (UPSERT STYLE) ================= */
export const mergeSizeGroupDB = async ({ category, sizes }) => {
  const existing = await getSizeGroupByCategory(category);

  // CASE 1: category exists → merge
  if (existing) {
    const mergedSizes = Array.from(
      new Set([...(existing.sizes || []), ...sizes])
    );

    await db.query(
      `
      UPDATE size_groups
      SET sizes = ?
      WHERE id = ?
      `,
      [JSON.stringify(mergedSizes), existing.id]
    );

    return {
      id: existing.id,
      category,
      sizes: mergedSizes,
    };
  }

  // CASE 2: new category
  return await createSizeGroupDB({ category, sizes });
};

/* ================= GET ALL ================= */
export const getAllSizeGroupsDB = async () => {
  const [rows] = await db.query(
    "SELECT * FROM size_groups ORDER BY category ASC"
  );

  return rows.map((r) => ({
    ...r,
    sizes: JSON.parse(r.sizes),
  }));
};

/* ================= UPDATE ================= */
export const updateSizeGroupDB = async (id, { category, sizes }) => {
  const [result] = await db.query(
    `
    UPDATE size_groups
    SET category = ?, sizes = ?
    WHERE id = ?
    `,
    [category, JSON.stringify(sizes), id]
  );

  if (result.affectedRows === 0) return null;

  const [rows] = await db.query("SELECT * FROM size_groups WHERE id = ?", [id]);

  return {
    ...rows[0],
    sizes: JSON.parse(rows[0].sizes),
  };
};

/* ================= DELETE ================= */
export const deleteSizeGroupDB = async (id) => {
  const [result] = await db.query("DELETE FROM size_groups WHERE id = ?", [id]);

  return result.affectedRows > 0;
};
