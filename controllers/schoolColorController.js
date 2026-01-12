import { normalizeText } from "../helper/schoolColorHelper/normalize.js";
import { checkDuplicateSchoolColor } from "../helper/schoolColorHelper/schoolColorDbHelper.js";
import {
  createSchoolColorDB,
  getSchoolColorsDB,
  updateSchoolColorDB,
  deleteSchoolColorDB,
} from "../helper/schoolColorHelper/schoolColorService.js";

// CREATE
export const createSchoolColor = async (req, res) => {
  try {
    const schoolColor = normalizeText(req.body.schoolColor);
    const description = normalizeText(req.body.description);

    if (!schoolColor)
      return res.status(400).json({ message: "School/Color is required" });

    const exists = await checkDuplicateSchoolColor({
      schoolColor,
      description,
    });

    if (exists)
      return res.status(400).json({ message: "School/Color already exists" });

    const data = await createSchoolColorDB({ schoolColor, description });
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// READ
export const getSchoolColors = async (req, res) => {
  const data = await getSchoolColorsDB();
  res.json(data);
};

// UPDATE
export const updateSchoolColor = async (req, res) => {
  try {
    const schoolColor = normalizeText(req.body.schoolColor);
    const description = normalizeText(req.body.description);
    const { id } = req.params;

    if (!schoolColor) {
      return res.status(400).json({ message: "School/Color is required" });
    }

    const exists = await checkDuplicateSchoolColor({
      schoolColor,
      excludeId: id,
    });

    if (exists) {
      return res.status(400).json({
        message: "School/Color already exists",
      });
    }

    const updated = await updateSchoolColorDB(id, {
      schoolColor,
      description,
    });

    res.json(updated);
  } catch (err) {
    console.error("UPDATE school color error:", err);
    res.status(500).json({ message: err.message });
  }
};

// DELETE
export const deleteSchoolColor = async (req, res) => {
  await deleteSchoolColorDB(req.params.id);
  res.json({ message: "Deleted successfully" });
};
