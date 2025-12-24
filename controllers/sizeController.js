import Size from "../models/Size.js";

// CREATE SIZE
export const createSize = async (req, res) => {
  try {
    const { category, size } = req.body;

    if (!category || !size) {
      return res
        .status(400)
        .json({ message: "Category and Size are required" });
    }

    const data = await Size.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL SIZES
export const getSizes = async (req, res) => {
  try {
    const data = await Size.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE SIZE
export const updateSize = async (req, res) => {
  try {
    const updated = await Size.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE SIZE
export const deleteSize = async (req, res) => {
  try {
    await Size.findByIdAndDelete(req.params.id);
    res.json({ message: "Size deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
