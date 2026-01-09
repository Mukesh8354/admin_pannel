import {
  createRMCategoryService,
  getRMCategoriesService,
  deleteRMCategoryService,
  updateRMCategoryService,
} from "../helper/rmCategoryHelper/rmCategoryService.js";

// CREATE
export const createRMCategory = async (req, res) => {
  try {
    const result = await createRMCategoryService(req.body);

    if (result?.error) return res.status(400).json({ message: result.error });

    res.status(201).json(result.data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET
export const getRMCategories = async (req, res) => {
  const data = await getRMCategoriesService();
  res.json(data);
};

// DELETE
export const deleteRMCategory = async (req, res) => {
  const deleted = await deleteRMCategoryService(req.params.id);

  if (!deleted)
    return res.status(404).json({ message: "RM Category not found" });

  res.json({ message: "RM Category deleted successfully" });
};

// UPDATE
export const updateRMCategory = async (req, res) => {
  const result = await updateRMCategoryService(req.params.id, req.body);

  if (result?.notFound)
    return res.status(404).json({ message: "RM Category not found" });

  if (result?.error) return res.status(400).json({ message: result.error });

  res.json(result.data);
};
