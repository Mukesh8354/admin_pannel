import ComponentCost from "../models/ComponentCost.js";

const calculateTotalCost = (rows = []) => {
  return rows.reduce((sum, r) => {
    return (
      sum +
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
      (r.ot5 || 0) +
      (r.othersdescription || 0)
    );
  }, 0);
};

export const createComponentCost = async (req, res) => {
  try {
    const { category, school, size, rows } = req.body;

    if (!category || !school || !size || !rows?.length) {
      return res.status(400).json({
        message: "Category, School, Size and rows are required",
      });
    }

    const totalCost = calculateTotalCost(rows);

    // ❌ duplicate check (optional but recommended)
    const exists = await ComponentCost.findOne({ category, school, size });
    if (exists) {
      return res.status(409).json({
        message: "Component cost already exists for this combination",
      });
    }

    const saved = await ComponentCost.create({
      category,
      school,
      size,
      rows,
      totalCost,
    });

    console.log(saved);
    res.status(201).json(saved);
  } catch (err) {
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
