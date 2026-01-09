import {
  normalize,
  isOnlyText,
  hasMinLength,
  hasThreeRepeatedLetters,
} from "../helper/measurementHelper/measurementValidation.js";

import { checkDuplicateMeasurement } from "../helper/measurementHelper/measurementDbHelper.js";

import {
  createMeasurementDB,
  getMeasurementsDB,
  updateMeasurementDB,
  deleteMeasurementDB,
} from "../helper/measurementHelper/measurementService.js";

export const createMeasurement = async (req, res) => {
  try {
    let unit = normalize(req.body.unit);
    let description = normalize(req.body.description);

    if (!unit) return res.status(400).json({ message: "Unit is required" });

    if (!isOnlyText(unit))
      return res
        .status(400)
        .json({ message: "Unit must contain only letters" });

    if (!hasMinLength(unit))
      return res.status(400).json({ message: "Min 2 characters required" });

    if (hasThreeRepeatedLetters(unit))
      return res.status(400).json({ message: "Same letter max 2 times" });

    unit = unit.charAt(0).toUpperCase() + unit.slice(1);

    const exists = await checkDuplicateMeasurement({ unit, description });
    if (exists)
      return res.status(400).json({ message: "Duplicate not allowed" });

    const data = await createMeasurementDB({ unit, description });

    res.status(201).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

/* ================= GET ================= */
export const getMeasurements = async (req, res) => {
  try {
    const data = await getMeasurementsDB();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= UPDATE ================= */
export const updateMeasurement = async (req, res) => {
  try {
    const { id } = req.params;

    let unit = normalize(req.body.unit);
    let description = normalize(req.body.description);

    if (!unit) return res.status(400).json({ message: "Unit is required" });

    unit = unit.charAt(0).toUpperCase() + unit.slice(1);

    const exists = await checkDuplicateMeasurement({
      unit,
      description,
      excludeId: id,
    });

    if (exists)
      return res
        .status(400)
        .json({ message: "Duplicate unit/description not allowed" });

    const updated = await updateMeasurementDB(id, { unit, description });

    res.json({ success: true, data: updated });
  } catch (err) {
    console.error("UPDATE ERROR:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

/* ================= DELETE ================= */
export const deleteMeasurement = async (req, res) => {
  try {
    await deleteMeasurementDB(req.params.id);
    res.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
