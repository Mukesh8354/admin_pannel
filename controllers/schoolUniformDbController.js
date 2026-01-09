import {
  createSchoolUniformService,
  getSchoolUniformsService,
  deleteSchoolUniformService,
  updateSchoolUniformService,
} from "../helper/schoolUniformHelper/schoolUniformService.js";

import { validateSchoolUniform } from "../helper/schoolUniformHelper/schoolUniformValidation.js";

export const createSchoolUniform = async (req, res) => {
  try {
    const error = validateSchoolUniform(req.body);
    if (error) return res.status(400).json({ message: error });

    const uniform = await createSchoolUniformService(req.body, req.files);
    res.status(201).json(uniform);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getSchoolUniforms = async (req, res) => {
  const data = await getSchoolUniformsService();
  res.json(data);
};

export const deleteSchoolUniform = async (req, res) => {
  const deleted = await deleteSchoolUniformService(req.params.id);
  if (!deleted) return res.status(404).json({ message: "Not found" });
  res.json({ message: "Deleted successfully" });
};

export const updateSchoolUniform = async (req, res) => {
  const updated = await updateSchoolUniformService(
    req.params.id,
    req.body,
    req.files
  );

  if (!updated) {
    return res.status(404).json({ message: "Uniform not found" });
  }

  res.json(updated);
};
