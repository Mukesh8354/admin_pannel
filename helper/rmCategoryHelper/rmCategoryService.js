// helper/rmCategoryHelper/rmCategoryService.js

import {
  createRMCategoryDB,
  getRMCategoriesDB,
  deleteRMCategoryDB,
  updateRMCategoryDB,
  findRMCategoryById,
  checkDuplicateRMCategory,
} from "./rmCategoryDbHelper.js";

import { normalize, validateRMCategory } from "./rmCategoryValidation.js";

export const createRMCategoryService = async (body) => {
  const category = normalize(body.category);
  const description = normalize(body.description);

  const error = validateRMCategory(category);
  if (error) return { error };

  const exists = await checkDuplicateRMCategory(category, description);
  if (exists)
    return {
      error: "Duplicate Rm_category/description not allowed",
    };

  const saved = await createRMCategoryDB({ category, description });
  return { data: saved };
};

export const getRMCategoriesService = async () => {
  return await getRMCategoriesDB();
};

export const deleteRMCategoryService = async (id) => {
  return await deleteRMCategoryDB(id);
};

export const updateRMCategoryService = async (id, body) => {
  const category = normalize(body.category);
  const description = normalize(body.description);

  const error = validateRMCategory(category);
  if (error) return { error };

  const exists = await checkDuplicateRMCategory(category, description);
  if (exists)
    return {
      error: "Duplicate Rm_category/description not allowed",
    };

  const updated = await updateRMCategoryDB(id, {
    category,
    description,
  });

  if (!updated) return { notFound: true };

  return { data: updated };
};
