import {
  createRawMaterialService,
  getRawMaterialsService,
} from "../helper/rawMaterialHelper/rawMaterialService.js";

// CREATE
export const createRawMaterial = async (req, res) => {
  try {
    const result = await createRawMaterialService(req.body, req.file);

    if (result?.error) {
      return res.status(400).json({ message: result.error });
    }

    res.status(201).json(result.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET
export const getRawMaterials = async (req, res) => {
  try {
    const data = await getRawMaterialsService();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
