import Average from "../models/Average.js";

// CREATE / SAVE
export const createAverage = async (req, res) => {
  try {
    const { category, rows } = req.body;

    if (!category || !rows?.length) {
      return res.status(400).json({ message: "Invalid data" });
    }

    const saved = await Average.create({ category, rows });
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAverages = async (req, res) => {
  try {
    const data = await Average.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAverageById = async (req, res) => {
  try {
    const data = await Average.findById(req.params.id);
    res.json(data);
  } catch (err) {
    res.status(404).json({ message: "Not found" });
  }
};

export const updateAverage = async (req, res) => {
  const { id } = req.params;

  const updated = await Average.findByIdAndUpdate(id, req.body, { new: true });

  res.json(updated);
};

export const deleteAverage = async (req, res) => {
  try {
    await Average.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createOrUpdateAverage = async (req, res) => {
  try {
    const { category, rows } = req.body;

    let existing = await Average.findOne({ category });

    // ✅ CASE 1: Category exists → MERGE rows
    if (existing) {
      const mergedMap = new Map();

      // पुरानी rows डालो
      existing.rows.forEach((r) => {
        mergedMap.set(r.size, r);
      });

      // नई rows merge करो
      rows.forEach((r) => {
        mergedMap.set(r.size, r); // same size → overwrite
      });

      existing.rows = Array.from(mergedMap.values());
      await existing.save();

      return res.status(200).json(existing);
    }

    // ✅ CASE 2: New category
    const created = await Average.create({ category, rows });
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
