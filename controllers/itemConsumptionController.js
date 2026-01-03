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

import ItemConsumption from "../models/ItemConsumption.js";

export const createItemConsumption = async (req, res) => {
  try {
    const { fgCategory, schoolColor, date, items } = req.body;

    // ✅ STEP 1: sirf UNIQUE sizes nikaalo
    const parentSizesSet = new Set();

    items.forEach((item) => {
      Object.keys(item.sizeQty || {}).forEach((size) => {
        parentSizesSet.add(size);
      });
    });

    // ✅ STEP 2: Array me convert
    const parentSizes = Array.from(parentSizesSet);
    // example: ["18", "20"]

    // ✅ STEP 3: Parent save (sizes ke sath)
    const saved = await ItemConsumption.create({
      fgCategory,
      schoolColor,
      date,
      sizes: parentSizes, // 🔥 YAHI MAIN CHANGE
      items,
    });

    res.status(201).json({
      message: "Item Consumption saved",
      data: saved,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

export const getItemConsumptions = async (req, res) => {
  try {
    const data = await ItemConsumption.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
