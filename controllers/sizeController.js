import {
  createSizeDB,
  getSizesDB,
  updateSizeDB,
  deleteSizeDB,
  checkDuplicateSize,
} from "../helper/sizeHelper/size.helper.js";

/* ================= CREATE SIZE ================= */
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

    // ✅ Duplicate check (MySQL)
    const exists = await checkDuplicateSize({ category, size });
    if (exists) {
      return res.status(409).json({
        message: "This size already exists in this category",
      });
    }

    const data = await createSizeDB({ category, size });
    res.status(201).json(data);
  } catch (err) {
    console.error("SIZE CREATE ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= GET ALL SIZES ================= */
export const getSizes = async (req, res) => {
  try {
    const data = await getSizesDB();
    res.json(data);
  } catch (err) {
    console.error("GET SIZE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

/* ================= UPDATE SIZE ================= */
export const updateSize = async (req, res) => {
  try {
    let { category, size } = req.body;
    const { id } = req.params;

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

    // ✅ Duplicate check except same id
    const duplicate = await checkDuplicateSize({
      category,
      size,
      excludeId: id,
    });

    if (duplicate) {
      return res.status(409).json({
        message: "This size already exists in this category",
      });
    }

    const updated = await updateSizeDB(id, { category, size });

    if (!updated) {
      return res.status(404).json({ message: "Size not found" });
    }

    res.json(updated);
  } catch (err) {
    console.error("UPDATE SIZE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

/* ================= DELETE SIZE ================= */
export const deleteSize = async (req, res) => {
  try {
    const deleted = await deleteSizeDB(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Size not found" });
    }

    res.json({ message: "Size deleted successfully" });
  } catch (err) {
    console.error("DELETE SIZE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};
