import RMCategory from "../models/RMCategory.js";

const isOnlyText = (value = "") => /^[a-zA-Z\s]+$/.test(value);
// min length
const hasMinLength = (value, min = 2) => value.length >= min;

// block aaa, bbb, ccc
const hasThreeRepeatedLetters = (value = "") =>
  /(.)\1\1/.test(value.replace(/\s+/g, ""));

// block zipzip, buttonbutton
const hasRepeatedWord = (value = "") => {
  const v = value.replace(/\s+/g, "").toLowerCase();
  return (
    v.length % 2 === 0 && v.slice(0, v.length / 2) === v.slice(v.length / 2)
  );
};

const isValidCategory = (value = "") => {
  return /^[A-Za-z]+( [A-Za-z]+)?$/.test(value);
};

const normalize = (v = "") =>
  typeof v === "string"
    ? v
        .trim()
        .toLowerCase()
        .replace(/[_\-]+/g, " ")
    : "";

export const createRMCategory = async (req, res) => {
  try {
    let category = normalize(req.body.category);
    let description = normalize(req.body.description);
    // const { category, description } = req.body;

    if (!category) {
      return res.status(400).json({ message: "Category is required" });
    }

    if (!isOnlyText(category)) {
      return res.status(400).json({
        message: "Category must contain only letters",
      });
    }

    // 🔒 MIN LENGTH
    if (!hasMinLength(category, 2)) {
      return res.status(400).json({
        message: "Category must be at least 2 characters long",
      });
    }

    // 🔒 BLOCK aaa / bbb
    if (hasThreeRepeatedLetters(category)) {
      return res.status(400).json({
        message: "Same letter cannot repeat more than 2 times",
      });
    }

    // 🔒 BLOCK zipzip / buttonbutton
    if (hasRepeatedWord(category)) {
      return res.status(400).json({
        message: "Repeated word is not allowed",
      });
    }

    // 🔥 ONLY LETTERS + ONE SPACE BETWEEN TWO WORDS
    if (!isValidCategory(category)) {
      return res.status(400).json({
        message:
          "Category must be one or two words only, letters allowed, single space between words",
      });
    }

    const exists = await RMCategory.findOne({
      $or: [
        { category: new RegExp(`^${category}$`, "i") },
        description
          ? { description: new RegExp(`^${description}$`, "i") }
          : null,
        description ? { category: new RegExp(`^${description}$`, "i") } : null,
        { description: new RegExp(`^${category}$`, "i") },
      ].filter(Boolean),
    });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Duplicate Rm_category/description not allowed",
      });
    }

    const saved = await RMCategory.create({
      category,
      description,
    });

    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getRMCategories = async (req, res) => {
  const data = await RMCategory.find().sort({ createdAt: -1 });
  res.json(data);
};

// DELETE
export const deleteRMCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await RMCategory.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "RM Category not found" });
    }

    res.json({ message: "RM Category deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
export const updateRMCategory = async (req, res) => {
  try {
    const { id } = req.params;

    let category = normalize(req.body.category);
    let description = normalize(req.body.description);

    if (!category) {
      return res.status(400).json({ message: "Category is required" });
    }

    if (!isOnlyText(category)) {
      return res.status(400).json({
        message: "Category must contain only letters",
      });
    }

    // 🔒 MIN LENGTH
    if (!hasMinLength(category, 2)) {
      return res.status(400).json({
        message: "Category must be at least 2 characters long",
      });
    }

    // 🔒 BLOCK aaa / bbb
    if (hasThreeRepeatedLetters(category)) {
      return res.status(400).json({
        message: "Same letter cannot repeat more than 2 times",
      });
    }

    // 🔒 BLOCK zipzip / buttonbutton
    if (hasRepeatedWord(category)) {
      return res.status(400).json({
        message: "Repeated word is not allowed",
      });
    }

    // 🔥 ONLY LETTERS + ONE SPACE BETWEEN TWO WORDS
    if (!isValidCategory(category)) {
      return res.status(400).json({
        message:
          "Category must be one or two words only, letters allowed, single space between words",
      });
    }

    const exists = await RMCategory.findOne({
      $or: [
        { category: new RegExp(`^${category}$`, "i") },
        description
          ? { description: new RegExp(`^${description}$`, "i") }
          : null,
        description ? { category: new RegExp(`^${description}$`, "i") } : null,
        { description: new RegExp(`^${category}$`, "i") },
      ].filter(Boolean),
    });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Duplicate Rm_category/description not allowed",
      });
    }

    const updated = await RMCategory.findByIdAndUpdate(
      id,
      {
        category,
        description,
      },
      { new: true } // 👈 updated data return
    );

    if (!updated) {
      return res.status(404).json({ message: "RM Category not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
