import SizeGroup from "../models/SizeGroup.js";

export const createSizeGroup = async (req, res) => {
  try {
    const { category, sizes } = req.body;

    if (!category || !Array.isArray(sizes) || sizes.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Category and at least one size required",
      });
    }

    // 🔍 Check existing category
    const exists = await SizeGroup.findOne({ category });

    // 👉 CASE 1: Category already exists → MERGE sizes
    if (exists) {
      const mergedSizes = Array.from(
        new Set([...(exists.sizes || []), ...sizes])
      );

      exists.sizes = mergedSizes;
      await exists.save();

      return res.status(200).json({
        success: true,
        message: "Sizes merged successfully",
        data: exists,
      });
    }

    // 👉 CASE 2: Category does not exist → CREATE new
    const sizeGroup = await SizeGroup.create({
      category,
      sizes,
    });

    return res.status(201).json({
      success: true,
      message: "Size group saved successfully",
      data: sizeGroup,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getSizeGroups = async (req, res) => {
  try {
    const sizeGroups = await SizeGroup.find().sort({ category: 1 });

    res.status(200).json({
      success: true,
      data: sizeGroups,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const deleteSizeGroup = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await SizeGroup.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Size group not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Size group deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const updateSizeGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const { category, sizes } = req.body;

    if (!category || !Array.isArray(sizes)) {
      return res.status(400).json({
        success: false,
        message: "Category and sizes are required",
      });
    }

    const updated = await SizeGroup.findByIdAndUpdate(
      id,
      { category, sizes },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Size group not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Size group updated successfully",
      data: updated,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getSizeMapping = async (req, res) => {
  try {
    const { category } = req.params;

    const mapping = await SizeGroup.findOne({ category });

    if (!mapping) {
      return res.status(404).json({
        message: "No size mapping found",
        sizes: [],
      });
    }

    res.json({
      category: mapping.category,
      sizes: mapping.sizes, // ["34x24", "34x26"]
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
