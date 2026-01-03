import ComponentCost from "../models/ComponentCost.js";

export const createComponentCost = async (req, res) => {
  try {
    const { rows } = req.body;

    if (!Array.isArray(rows) || rows.length === 0) {
      return res.status(400).json({
        message: "Rows are required",
      });
    }

    for (const r of rows) {
      if (!r.category || !r.school || !r.size) {
        return res.status(400).json({
          message: "Each row must have category, school and size",
        });
      }
    }

    for (const r of rows) {
      const exists = await ComponentCost.findOne({
        category: r.category,
        school: r.school,
        size: r.size,
      });

      if (exists) {
        return res.status(409).json({
          message: `Component cost already exists for ${r.category} - ${r.school} - ${r.size}`,
        });
      }
    }

    const docs = rows.map((r) => ({
      ...r,
      totalCost:
        (r.basic || 0) +
        (r.label || 0) +
        (r.piping || 0) +
        (r.longpiping || 0) +
        (r.shoulder || 0) +
        (r.pocket || 0) +
        (r.flap || 0) +
        (r.fashion || 0) +
        (r.gallis || 0) +
        (r.extra || 0) +
        (r.baju || 0) +
        (r.waist || 0) +
        (r.ot1 || 0) +
        (r.ot2 || 0) +
        (r.ot3 || 0) +
        (r.ot4 || 0) +
        (r.ot5 || 0),
    }));

    const saved = await ComponentCost.insertMany(docs);

    res.status(201).json({
      message: "Component costs saved successfully",
      count: saved.length,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// 🔹 GET (parent reload ke liye)
export const getComponentCosts = async (req, res) => {
  try {
    const data = await ComponentCost.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
