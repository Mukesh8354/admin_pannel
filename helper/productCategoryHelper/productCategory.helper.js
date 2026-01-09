/* import ProductCategory from "../../models/ProductCategory.js";

// GET ALL
export const getAllCategories = async () => {
  return await ProductCategory.find();
};

// CREATE
export const createCategory = async (data) => {
  return await ProductCategory.create(data);
};

// UPDATE
export const updateCategoryById = async (id, data) => {
  return await ProductCategory.findByIdAndUpdate(id, data, {
    new: true,
  });
};

// DELETE
export const deleteCategoryById = async (id) => {
  return await ProductCategory.findByIdAndDelete(id);
};*/

import db from "../../config/mysql.js";

/* ================= GET ALL ================= */
export const getAllCategories = async () => {
  const [rows] = await db.query(`
    SELECT
      id,
      category,
      press_rate AS pressRate,
      cutting_rate AS cuttingRate,
      kaj_button_rate AS kajButtonRate,
      description
    FROM product_categories
    ORDER BY created_at DESC
  `);
  return rows;
};

/* ================= CREATE ================= */
export const createCategory = async (data) => {
  const {
    category,
    pressRate = 0,
    cuttingRate = 0,
    kajButtonRate = 0,
    description,
  } = data;

  const sql = `
    INSERT INTO product_categories
    (category, press_rate, cutting_rate, kaj_button_rate, description)
    VALUES (?, ?, ?, ?, ?)
  `;

  const [result] = await db.query(sql, [
    category,
    pressRate,
    cuttingRate,
    kajButtonRate,
    description,
  ]);

  return {
    id: result.insertId,
    category,
    pressRate,
    cuttingRate,
    kajButtonRate,
    description,
  };
};

/* ================= UPDATE ================= */
export const updateCategoryById = async (id, data) => {
  const { category, pressRate, cuttingRate, kajButtonRate, description } = data;

  const [result] = await db.query(
    `
    UPDATE product_categories
    SET category = ?, press_rate = ?, cutting_rate = ?, kaj_button_rate = ?, description = ?
    WHERE id = ?
    `,
    [category, pressRate, cuttingRate, kajButtonRate, description, id]
  );

  if (result.affectedRows === 0) return null;

  const [rows] = await db.query(
    "SELECT * FROM product_categories WHERE id = ?",
    [id]
  );

  return rows[0];
};

/* ================= DELETE ================= */
export const deleteCategoryById = async (id) => {
  const [result] = await db.query(
    "DELETE FROM product_categories WHERE id = ?",
    [id]
  );

  return result.affectedRows > 0;
};
