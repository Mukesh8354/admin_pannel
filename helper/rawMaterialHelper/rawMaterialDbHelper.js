// helper/rawMaterialHelper/rawMaterialDbHelper.js
import db from "../../config/mysql.js";

/* ================= CREATE ================= */
export const createRawMaterialDB = async (data) => {
  const {
    category,
    itemName,
    designNo,
    hsnCode,
    unit,
    gst,
    size,
    schoolColor,
    purchaseRate,
    openingStock,
    minimumStock,
    maximumStock,
    remarks,
    image,
  } = data;

  const [result] = await db.query(
    `
    INSERT INTO raw_materials (
      category,
      item_name,
      design_no,
      hsn_code,
      unit,
      gst,
      size,
      school_color,
      purchase_rate,
      opening_stock,
      minimum_stock,
      maximum_stock,
      remarks,
      image
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      category,
      itemName,
      designNo,
      hsnCode,
      unit,
      gst,
      size,
      schoolColor,
      purchaseRate,
      openingStock,
      minimumStock,
      maximumStock,
      remarks,
      image,
    ]
  );

  return {
    id: result.insertId,
    ...data,
  };
};

/* ================= GET ALL ================= */
export const getRawMaterialsDB = async () => {
  const [rows] = await db.query(
    `
    SELECT
      id,
      category,
      item_name AS itemName,
      design_no AS designNo,
      hsn_code AS hsnCode,
      unit,
      gst,
      size,
      school_color AS schoolColor,
      purchase_rate AS purchaseRate,
      opening_stock AS openingStock,
      minimum_stock AS minimumStock,
      maximum_stock AS maximumStock,
      remarks,
      image,
      created_at,
      updated_at
    FROM raw_materials
    ORDER BY created_at DESC
    `
  );

  return rows;
};
