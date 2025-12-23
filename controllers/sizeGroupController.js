import SizeGroup from "../models/SizeGroup.js";

export const createSizeGroup = async (req, res) => {
  try {
    const { category, sizes } = req.body;

    if (!category || !sizes || sizes.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Category and at least one size required",
      });
    }

    const exists = await SizeGroup.findOne({ category });
    if (exists) {
      return res.status(409).json({
        success: false,
        message: "Size group already exists for this category",
      });
    }

    const sizeGroup = await SizeGroup.create({
      category,
      sizes,
    });

    res.status(201).json({
      success: true,
      message: "Size group saved successfully",
      data: sizeGroup,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
