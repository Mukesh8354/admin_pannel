import SchoolUniform from "../models/SchoolUniform.js";

export const createSchoolUniform = async (req, res) => {
  try {
    const { category, schoolColor, itemName, sizes } = req.body;

    // const imagePaths = req.files?.map((f) => f.filename);

    const imagePaths = req.files
      ? req.files
          .filter(
            (file) => file && file.filename && file.filename.includes(".")
          )
          .map((file) => file.filename)
      : [];

    if (!category || !schoolColor || !itemName) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const uniform = await SchoolUniform.create({
      category,
      schoolColor,
      itemName,
      sizes,
      images: imagePaths,
    });

    res.status(201).json(uniform);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getSchoolUniforms = async (req, res) => {
  const data = await SchoolUniform.find().sort({ createdAt: -1 });
  res.json(data);
};

export const deleteSchoolUniform = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await SchoolUniform.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateSchoolUniform = async (req, res) => {
  try {
    const { id } = req.params;
    const { category, schoolColor, itemName, sizes } = req.body;

    // 🔍 existing record
    const existing = await SchoolUniform.findById(id);
    if (!existing) {
      return res.status(404).json({ message: "Uniform not found" });
    }

    // 🖼️ new images (if uploaded)
    let newImages = existing.images || [];

    if (req.files && req.files.length > 0) {
      const uploaded = req.files
        .filter((file) => file && file.filename && file.filename.includes("."))
        .map((file) => file.filename);
      newImages = [...newImages, ...uploaded]; // append new images
    }

    // 📝 update fields
    existing.category = category ?? existing.category;
    existing.schoolColor = schoolColor ?? existing.schoolColor;
    existing.itemName = itemName ?? existing.itemName;
    existing.sizes = sizes ?? existing.sizes;
    existing.images = newImages;

    await existing.save();

    res.json(existing);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
