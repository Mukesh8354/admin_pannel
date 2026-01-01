import Measurement from "../models/Measurement.js";

/* ================= HELPERS ================= */

const isOnlyText = (value) => /^[A-Za-z]+$/.test(value);

// minimum 2 characters
const hasMinLength = (value, min = 2) => value.length >= min;

// block A, AA, aaa, BBB
// const isNotRepeatedChar = (value) => !/^([A-Za-z])\1+$/.test(value);

// block  aaa, BBB
const hasThreeRepeatedLetters = (value) => {
  return /(.)\1\1/.test(value.toLowerCase());
};

const normalize = (v = "") => v.toString().trim().toLowerCase();

/* ================= CREATE ================= */

export const createMeasurement = async (req, res) => {
  try {
    let unit = normalize(req.body.unit);
    let description = normalize(req.body.description);

    if (!unit) {
      return res.status(400).json({
        success: false,
        message: "Unit is required",
      });
    }

    // only letters
    if (!isOnlyText(unit)) {
      return res.status(400).json({
        success: false,
        message: "Unit must contain only letters",
      });
    }

    if (!hasMinLength(unit)) {
      return res.status(400).json({
        success: false,
        message: "Unit must be at least 2 characters long",
      });
    }

    if (hasThreeRepeatedLetters(unit)) {
      return res.status(400).json({
        success: false,
        message: "Same letter cannot repeat more than 2 times",
      });
    }

    // Display format
    unit = unit.charAt(0).toUpperCase() + unit.slice(1);

    // 🔎 STRICT DUPLICATE CHECK
    const exists = await Measurement.findOne({
      $or: [
        { unit: new RegExp(`^${unit}$`, "i") },
        description
          ? { description: new RegExp(`^${description}$`, "i") }
          : null,
        description ? { unit: new RegExp(`^${description}$`, "i") } : null,
        { description: new RegExp(`^${unit}$`, "i") },
      ].filter(Boolean),
    });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Duplicate unit/description not allowed",
      });
    }

    const data = await Measurement.create({ unit, description });

    res.status(201).json({
      success: true,
      message: "Measurement created successfully",
      data,
    });
  } catch (err) {
    console.error("CREATE ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getMeasurements = async (req, res) => {
  try {
    const data = await Measurement.find().sort({ createdAt: -1 });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateMeasurement = async (req, res) => {
  try {
    const { id } = req.params;

    let unit = normalize(req.body.unit);
    let description = normalize(req.body.description);

    if (!unit) {
      return res.status(400).json({ message: "Unit is required" });
    }

    unit = unit.charAt(0).toUpperCase() + unit.slice(1);

    const exists = await Measurement.findOne({
      _id: { $ne: id },
      $or: [
        { unit: new RegExp(`^${unit}$`, "i") },
        description
          ? { description: new RegExp(`^${description}$`, "i") }
          : null,
        description ? { unit: new RegExp(`^${description}$`, "i") } : null,
        { description: new RegExp(`^${unit}$`, "i") },
      ].filter(Boolean),
    });

    if (exists) {
      return res.status(400).json({
        message: "Duplicate unit/description not allowed",
      });
    }

    const updated = await Measurement.findByIdAndUpdate(
      id,
      { unit, description },
      { new: true }
    );

    res.json({ success: true, data: updated });
  } catch (err) {
    console.error("UPDATE ERROR:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteMeasurement = async (req, res) => {
  try {
    await Measurement.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
