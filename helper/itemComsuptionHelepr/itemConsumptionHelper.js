import pool from "../../config/mysql.js"; // ✅ IMPORTANT

export const extractUniqueSizes = (items = []) => {
  const sizeSet = new Set();

  items.forEach((item) => {
    Object.keys(item.sizeQty || {}).forEach((size) => {
      sizeSet.add(size);
    });
  });

  return Array.from(sizeSet);
};

export const createItemConsumptionDB = async ({
  fgCategory,
  schoolColor,
  date,
  items,
}) => {
  const sizes = [];

  items.forEach((item) => {
    Object.keys(item.sizeQty || {}).forEach((sz) => {
      if (!sizes.includes(sz)) sizes.push(sz);
    });
  });

  const [result] = await pool.execute(
    `INSERT INTO item_consumptions
     (fg_category, school_color, consumption_date, sizes, items)
     VALUES (?, ?, ?, ?, ?)`,
    [
      fgCategory,
      schoolColor,
      date,
      JSON.stringify(sizes), // ✅ JSON
      JSON.stringify(items), // ✅ JSON
    ]
  );

  return { id: result.insertId };
};

// 👉 GET ALL ItemConsumptions
export const getItemConsumptionsDB = async () => {
  const [rows] = await pool.execute(
    `SELECT * FROM item_consumptions ORDER BY created_at DESC`
  );
  return rows; // ✅ ARRAY
};
