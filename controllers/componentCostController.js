// controllers/componentCostController.js

import { validateComponentCostRows } from "../helper/componentCostHelper/componentCostValidation.js";

import { checkComponentCostExists } from "../helper/componentCostHelper/componentCostDbHelper.js";

import { calculateTotalCost } from "../helper/componentCostHelper/componentCostCalcHelper.js";

import {
  insertComponentCostsDB,
  getComponentCostsDB,
} from "../helper/componentCostHelper/componentCostService.js";

// CREATE
export const createComponentCost = async (req, res) => {
  try {
    const { rows } = req.body;

    const validationError = validateComponentCostRows(rows);
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    // 🔎 Duplicate check
    for (const r of rows) {
      const exists = await checkComponentCostExists({
        category: r.category,
        school: r.school,
        size: r.size,
      });

      if (exists) {
        return res.status(409).json({
          message: `Component cost already exists for ${r.category} - ${r.school} - ${r.size}`,
        });
      }
    }

    // 💰 Calculate totalCost
    const docs = rows.map((r) => ({
      ...r,
      total_cost: calculateTotalCost(r),
    }));

    const saved = await insertComponentCostsDB(docs);

    res.status(201).json({
      message: "Component costs saved successfully",
      count: saved.length,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// READ
export const getComponentCosts = async (req, res) => {
  try {
    const data = await getComponentCostsDB();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
