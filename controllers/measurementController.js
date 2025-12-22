import Measurement from "../models/Measurement.js";

// CREATE
export const createMeasurement = async (req, res) => {
  try {
    const { unit, description } = req.body;
    const data = await Measurement.create({ unit, description });
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// READ
export const getMeasurements = async (req, res) => {
  try {
    const data = await Measurement.find().sort({ createdAt: -1 });
    
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
