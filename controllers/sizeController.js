import Size from "../models/Size.js";

// CREATE SIZE
export const createSize = async (req, res) => {
  try {
    let { category, size } = req.body;

    if (!category || !size) {
      return res
        .status(400)
        .json({ message: "Category and Size are required" });
    }

    category = category.trim();
    size = size.toString().trim();

    const isNumericOrX = /^(\d+|\d+x\d+)$/.test(size);
    const isAlphaNumeric = /^[a-zA-Z0-9]+$/.test(size);

    if (!isNumericOrX && !isAlphaNumeric) {
      return res.status(400).json({
        message:
          "Size must be numeric (28), dimension (12x18), or alphanumeric (XL, M32)",
      });
    }

    // 🔴 Duplicate check (controller level)
    const exists = await Size.findOne({ size });
    if (exists) {
      return res.status(409).json({
        message: "This size already exists in this category",
      });
    }

    const data = await Size.create({ category, size });
    res.status(201).json(data);
  } catch (err) {
    // 🔴 DUPLICATE ERROR HANDLE
    if (err.code === 11000) {
      return res.status(409).json({
        message: "Duplicate size not allowed",
      });
    }

    console.error("SIZE CREATE ERROR:", err);
    res.status(500).json({ message: "Server error" });
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
    let { category, size } = req.body;

    if (!category || !size) {
      return res
        .status(400)
        .json({ message: "Category and Size are required" });
    }

    category = category.trim();
    size = size.trim();

    const isNumericOrX = /^(\d+|\d+x\d+)$/.test(size);
    const isAlphaNumeric = /^[a-zA-Z0-9]+$/.test(size);

    if (!isNumericOrX && !isAlphaNumeric) {
      return res.status(400).json({
        message:
          "Size must be numeric (28), dimension (12x18), or alphanumeric (XL, M32)",
      });
    }

    // 🔴 duplicate check except same id
    const duplicate = await Size.findOne({
      size,
      _id: { $ne: req.params.id },
    });

    if (duplicate) {
      return res.status(409).json({
        message: "This size already exists in this category",
      });
    }

    const updated = await Size.findByIdAndUpdate(
      req.params.id,
      { category, size },
      { new: true }
    );

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
