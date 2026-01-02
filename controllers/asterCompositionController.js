import AsterComposition from "../models/AsterComposition.js";

export const saveAsterComposition = async (req, res) => {
  try {
    const { category, sizes } = req.body;

    if (!category || !sizes || sizes.length === 0) {
      return res.status(400).json({ message: "Invalid data" });
    }

    // UPSERT → duplicate category avoid
    const result = await AsterComposition.findOneAndUpdate(
      { category },
      { $set: { sizes } },
      { new: true, upsert: true }
    );

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAsterCompositions = async (req, res) => {
  try {
    const data = await AsterComposition.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
