import SchoolColor from "../models/SchoolColor.js";

const normalizeText = (v = "") =>
  v
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[_\-]+/g, " ") // _  -  → space
    .replace(/\s+/g, " ");

// CREATE
export const createSchoolColor = async (req, res) => {
  try {
    let schoolColor = normalizeText(req.body.schoolColor);
    let description = normalizeText(req.body.description);
    // const { schoolColor, description } = req.body;

    if (!schoolColor)
      return res.status(400).json({ message: "School/Color is required" });

    // 🔎 STRICT DUPLICATE CHECK
    const exists = await SchoolColor.findOne({
      $or: [
        { schoolColor: new RegExp(`^${schoolColor}$`, "i") },
        description
          ? { description: new RegExp(`^${description}$`, "i") }
          : null,
        description
          ? { schoolColor: new RegExp(`^${description}$`, "i") }
          : null,
        { description: new RegExp(`^${schoolColor}$`, "i") },
      ].filter(Boolean),
    });

    // const exists = await SchoolColor.findOne({
    //   schoolColor: schoolColor.toLowerCase().trim(),
    // });

    if (exists)
      return res.status(400).json({ message: "School/Color already exists" });

    const data = await SchoolColor.create({
      schoolColor,
      description,
    });

    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// READ
export const getSchoolColors = async (req, res) => {
  const data = await SchoolColor.find().sort({ schoolColor: 1 });
  res.json(data);
};

// UPDATE
export const updateSchoolColor = async (req, res) => {
  try {
    const { schoolColor } = req.body;

    const exists = await SchoolColor.findOne({
      schoolColor: schoolColor.toLowerCase().trim(),
      _id: { $ne: req.params.id },
    });

    if (exists)
      return res.status(400).json({ message: "School/Color already exists" });

    const updated = await SchoolColor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
export const deleteSchoolColor = async (req, res) => {
  await SchoolColor.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted successfully" });
};
