/*import Measurement from "../../models/Measurement.js";

export const createMeasurementDB = async (data) => {
  return await Measurement.create(data);
};

export const getMeasurementsDB = async () => {
  return await Measurement.find().sort({ createdAt: -1 });
};

export const updateMeasurementDB = async (id, data) => {
  return await Measurement.findByIdAndUpdate(id, data, {
    new: true,
  });
};

export const deleteMeasurementDB = async (id) => {
  return await Measurement.findByIdAndDelete(id);
};*/

import db from "../../config/mysql.js";

/**
 * CREATE
 */
export const createMeasurementDB = async (data) => {
  const { unit, description } = data;

  const sql = `
    INSERT INTO measurements (unit, description)
    VALUES (?, ?)
  `;

  const [result] = await db.query(sql, [unit, description]);

  return {
    id: result.insertId,
    unit,
    description,
  };
};

/**
 * READ ALL
 */
export const getMeasurementsDB = async () => {
  const sql = `
    SELECT *
    FROM measurements
    ORDER BY id DESC
  `;

  const [rows] = await db.query(sql);
  return rows;
};

/**
 * UPDATE
 */
export const updateMeasurementDB = async (id, data) => {
  const { unit, description } = data;

  const sql = `
    UPDATE measurements
    SET unit = ?, description = ?
    WHERE id = ?
  `;

  await db.query(sql, [unit, description, id]);

  const [rows] = await db.query("SELECT * FROM measurements WHERE id = ?", [
    id,
  ]);

  return rows[0] || null;
};

/**
 * DELETE
 */
export const deleteMeasurementDB = async (id) => {
  const [rows] = await db.query("SELECT * FROM measurements WHERE id = ?", [
    id,
  ]);

  if (!rows.length) return null;

  await db.query("DELETE FROM measurements WHERE id = ?", [id]);

  return rows[0];
};
