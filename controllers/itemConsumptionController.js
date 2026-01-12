/*import ItemConsumption from "../models/ItemConsumption.js";

export const createItemConsumption = async (req, res) => {
  try {
    const data = req.body;

    const saved = await ItemConsumption.create(data);

    res.status(201).json({
      message: "Item Consumption saved",
      data: saved,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};*/

import {
  createItemConsumptionDB,
  getItemConsumptionsDB,
} from "../helper/itemComsuptionHelepr/itemConsumptionHelper.js";

// 👉 CREATE ItemConsumption
export const createItemConsumption = async (req, res) => {
  try {
    const saved = await createItemConsumptionDB(req.body);

    res.status(201).json({
      message: "Item Consumption saved",
      data: saved,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// 👉 GET ALL ItemConsumptions
export const getItemConsumptions = async (req, res) => {
  try {
    const data = await getItemConsumptionsDB();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
