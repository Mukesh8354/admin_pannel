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

/* ================= CREATE ================= */

export const createMeasurement = async (req, res) => {
  try {
    let { unit, description } = req.body;

    // REQUIRED
    if (!unit || unit.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Unit is required",
      });
    }

    unit = unit.trim();

    // ONLY LETTERS
    if (!isOnlyText(unit)) {
      return res.status(400).json({
        success: false,
        message: "Unit must contain only letters",
      });
    }

    // MIN LENGTH
    if (!hasMinLength(unit)) {
      return res.status(400).json({
        success: false,
        message: "Unit must be at least 2 characters long",
      });
    }

    // SAME LETTER REPEAT BLOCK
    if (hasThreeRepeatedLetters(unit)) {
      return res.status(400).json({
        success: false,
        message: "Same letter cannot repeat more than 2 times",
      });
    }

    // FORMAT (optional)
    unit = unit.charAt(0).toUpperCase() + unit.slice(1).toLowerCase();

    // DUPLICATE CHECK (case-insensitive)
    const exists = await Measurement.findOne({
      unit: { $regex: new RegExp("^" + unit + "$", "i") },
    });

    if (exists) {
      return res.status(409).json({
        success: false,
        message: "Measurement unit already exists",
      });
    }

    // SAVE
    const data = await Measurement.create({ unit, description });

    res.status(201).json({
      success: true,
      message: "Measurement created successfully",
      data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
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
    let { unit, description } = req.body;

    if (!unit || unit.trim() === "") {
      return res.status(400).json({ message: "Unit required" });
    }

    unit = unit.trim();

    const exists = await Measurement.findOne({
      _id: { $ne: id },
      unit: { $regex: new RegExp("^" + unit + "$", "i") },
    });

    if (exists) {
      return res.status(409).json({ message: "Unit already exists" });
    }

    const data = await Measurement.findByIdAndUpdate(
      id,
      { unit, description },
      { new: true }
    );

    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ message: err.message });
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
