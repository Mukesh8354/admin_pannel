import ItemConsumption from "../models/ItemConsumption.js";

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
};

export const getItemConsumptions = async (req, res) => {
  try {
    const data = await ItemConsumption.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
