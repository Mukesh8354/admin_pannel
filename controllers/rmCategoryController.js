import RMCategory from "../models/RMCategory.js";

export const createRMCategory = async (req, res) => {
  try {
    const { category, description } = req.body;

    if (!category) {
      return res.status(400).json({ message: "Category is required" });
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
    const { category, description } = req.body;

    if (!category) {
      return res.status(400).json({ message: "Category is required" });
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
