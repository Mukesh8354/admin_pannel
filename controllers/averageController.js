// controllers/averageController.js

import {
  findAverageByCategory,
  findAverageById,
} from "../helper/averageHelper/averageDbHelper.js";

import {
  createAverageDB,
  getAveragesDB,
  updateAverageDB,
  deleteAverageDB,
  insertAverageRowsDB,
  upsertAverageRowsDB,
  createAverageOneTableDB,
} from "../helper/averageHelper/averageService.js";

import {
  checkDuplicateSizes,
  mergeRowsBySize,
} from "../helper/averageHelper/averageMergeHelper.js";

// CREATE
export const createAverage = async (req, res) => {
  try {
    const { category, rows } = req.body;

    if (!category) {
      return res.status(400).json({ message: "Category required" });
    }

    if (!Array.isArray(rows) || rows.length === 0) {
      return res.status(400).json({ message: "Rows array required" });
    }

    await createAverageOneTableDB(category, rows);

    res.status(201).json({ success: true });
  } catch (err) {
    console.error("CREATE AVERAGE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

// READ ALL
export const getAverages = async (req, res) => {
  try {
    const data = await getAveragesDB();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// READ BY ID
export const getAverageById = async (req, res) => {
  try {
    const data = await findAverageById(req.params.id);
    if (!data) return res.status(404).json({ message: "Not found" });
    res.json(data);
  } catch (err) {
    res.status(404).json({ message: "Not found" });
  }
};

// UPDATE
export const updateAverage = async (req, res) => {
  try {
    const { category, rows } = req.body;

    if (!category || !Array.isArray(rows) || rows.length === 0) {
      return res.status(400).json({ message: "Invalid payload" });
    }

    const row = rows[0]; // merged single row

    await updateAverageDB(req.params.id, {
      category,
      size: row.size,
      c89: row.c89,
      c112: row.c112,
      c137: row.c137,
      c142: row.c142,
      c147: row.c147,
    });

    res.json({ success: true });
  } catch (err) {
    console.error("UPDATE AVERAGE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

// DELETE
export const deleteAverage = async (req, res) => {
  try {
    await deleteAverageDB(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE OR UPDATE (MERGE)
export const createOrUpdateAverage = async (req, res) => {
  try {
    const { category, rows } = req.body;

    const existing = await findAverageByCategory(category);

    if (existing) {
      existing.rows = mergeRowsBySize(existing.rows, rows);
      await insertAverageRowsDB(existing.id, rows);
      return res.status(200).json(existing);
    }

    const created = await createAverageDB({ category, rows });
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
