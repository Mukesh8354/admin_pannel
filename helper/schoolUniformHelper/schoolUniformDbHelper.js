import db from "../../config/mysql.js";

/* ================= CREATE ================= */
export const createSchoolUniformDB = async (data) => {
  const { category, schoolColor, itemName, sizes, images = [] } = data;

  const [result] = await db.query(
    `
    INSERT INTO school_uniforms
    (category, school_color, item_name, sizes, images)
    VALUES (?, ?, ?, ?, ?)
    `,
    [
      category,
      schoolColor,
      itemName,
      JSON.stringify(sizes),
      JSON.stringify(images),
    ]
  );

  return {
    id: result.insertId,
    category,
    schoolColor,
    itemName,
    sizes,
    images,
  };
};

/* ================= GET ALL ================= */
export const getSchoolUniformsDB = async () => {
  const [rows] = await db.query(`
    SELECT
      id,
      category,
      school_color AS schoolColor,
      item_name AS itemName,
      sizes,
      images,
      created_at,
      updated_at
    FROM school_uniforms
    ORDER BY created_at DESC
  `);

  return rows.map((r) => ({
    ...r,
    sizes: r.sizes ? JSON.parse(r.sizes) : [],
    images: r.images ? JSON.parse(r.images) : [],
  }));
};

/* ================= FIND BY ID ================= */
export const findSchoolUniformById = async (id) => {
  const [rows] = await db.query(
    `
    SELECT
      id,
      category,
      school_color AS schoolColor,
      item_name AS itemName,
      sizes,
      images,
      created_at,
      updated_at
    FROM school_uniforms
    WHERE id = ?
    `,
    [id]
  );

  if (!rows.length) return null;

  return {
    ...rows[0],
    sizes: rows[0].sizes ? JSON.parse(rows[0].sizes) : [],
    images: rows[0].images ? JSON.parse(rows[0].images) : [],
  };
};

/* ================= DELETE ================= */
export const deleteSchoolUniformDB = async (id) => {
  const [result] = await db.query("DELETE FROM school_uniforms WHERE id = ?", [
    id,
  ]);

  return result.affectedRows > 0;
};

/* ================= UPDATE ================= */
export const updateSchoolUniformDB = async (id, data) => {
  const fields = [];
  const values = [];

  if (data.category !== undefined) {
    fields.push("category = ?");
    values.push(data.category);
  }
  if (data.schoolColor !== undefined) {
    fields.push("school_color = ?");
    values.push(data.schoolColor);
  }
  if (data.itemName !== undefined) {
    fields.push("item_name = ?");
    values.push(data.itemName);
  }
  if (data.sizes !== undefined) {
    fields.push("sizes = ?");
    values.push(JSON.stringify(data.sizes));
  }
  if (data.images !== undefined) {
    fields.push("images = ?");
    values.push(JSON.stringify(data.images));
  }

  if (!fields.length) return null;

  values.push(id);

  await db.query(
    `
    UPDATE school_uniforms
    SET ${fields.join(", ")}
    WHERE id = ?
    `,
    values
  );

  return await findSchoolUniformById(id);
};
