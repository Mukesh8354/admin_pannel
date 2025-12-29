import RawMaterial from "../models/RawMaterial.js";

export const createRawMaterial = async (req, res) => {
  try {
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
    } = req.body;

    const rawMaterial = await RawMaterial.create({
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
      image: req.file ? req.file.filename : null,
    });

    res.status(201).json(rawMaterial);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRawMaterials = async (req, res) => {
  try {
    const data = await RawMaterial.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
