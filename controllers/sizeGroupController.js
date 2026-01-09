import {
  mergeSizeGroupDB,
  getAllSizeGroupsDB,
  deleteSizeGroupDB,
  updateSizeGroupDB,
  getSizeGroupByCategory,
} from "../helper/sizeGroupHelper/sizeGroup.helper.js";

/* ================= CREATE / MERGE SIZE GROUP ================= */
export const createSizeGroup = async (req, res) => {
  try {
    const { category, sizes } = req.body;

    if (!category || !Array.isArray(sizes) || sizes.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Category and at least one size required",
      });
    }

    // 👉 Mongo findOne + merge + create ka SQL equivalent
    const data = await mergeSizeGroupDB({ category, sizes });

    return res.status(200).json({
      success: true,
      message: "Size group saved successfully",
      data,
    });
  } catch (error) {
    console.error("CREATE SIZE GROUP ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* ================= GET ALL SIZE GROUPS ================= */
export const getSizeGroups = async (req, res) => {
  try {
    const data = await getAllSizeGroupsDB();

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("GET SIZE GROUPS ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* ================= DELETE SIZE GROUP ================= */
export const deleteSizeGroup = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await deleteSizeGroupDB(id);

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
    console.error("DELETE SIZE GROUP ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* ================= UPDATE SIZE GROUP ================= */
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

    const updated = await updateSizeGroupDB(id, { category, sizes });

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
    console.error("UPDATE SIZE GROUP ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* ================= GET SIZE MAPPING BY CATEGORY ================= */
export const getSizeMapping = async (req, res) => {
  try {
    const { category } = req.params;

    const mapping = await getSizeGroupByCategory(category);

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
    console.error("GET SIZE MAPPING ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};
