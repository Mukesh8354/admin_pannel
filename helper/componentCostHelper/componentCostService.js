import db from "../../config/mysql.js";

export const insertComponentCostsDB = async (docs = []) => {
  if (!docs.length) return [];

  const values = docs.map((d) => [
    d.category,
    d.school,
    d.size,
    d.basic || 0,
    d.label || 0,
    d.piping || 0,
    d.longpiping || 0,
    d.shoulder || 0,
    d.pocket || 0,
    d.flap || 0,
    d.fashion || 0,
    d.gallis || 0,
    d.extra || 0,
    d.baju || 0,
    d.waist || 0,
    d.ot1 || 0,
    d.ot2 || 0,
    d.ot3 || 0,
    d.ot4 || 0,
    d.ot5 || 0,
    d.total_cost || 0,
  ]);

  const [result] = await db.query(
    `
    INSERT INTO component_costs
    (
      category, school, size,
      basic, label, piping, longpiping, shoulder, pocket, flap,
      fashion, gallis, extra, baju, waist,
      ot1, ot2, ot3, ot4, ot5,
      total_cost
    )
    VALUES ?
    `,
    [values]
  );

  return result;
};

export const getComponentCostsDB = async () => {
  const [rows] = await db.query(
    `
    SELECT *
    FROM component_costs
    ORDER BY created_at DESC
    `
  );

  return rows;
};
