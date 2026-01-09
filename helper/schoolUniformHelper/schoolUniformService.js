import {
  createSchoolUniformDB,
  getSchoolUniformsDB,
  findSchoolUniformById,
  deleteSchoolUniformDB,
  updateSchoolUniformDB,
} from "./schoolUniformDbHelper.js";

import { extractImageNames } from "./schoolUniformValidation.js";

/* ================= CREATE ================= */
export const createSchoolUniformService = async (body, files) => {
  const images = extractImageNames(files);

  return await createSchoolUniformDB({
    ...body,
    images,
  });
};

/* ================= GET ALL ================= */
export const getSchoolUniformsService = async () => {
  return await getSchoolUniformsDB();
};

/* ================= DELETE ================= */
export const deleteSchoolUniformService = async (id) => {
  return await deleteSchoolUniformDB(id);
};

/* ================= UPDATE ================= */
export const updateSchoolUniformService = async (id, body, files) => {
  const existing = await findSchoolUniformById(id);
  if (!existing) return null;

  let images = existing.images || [];

  if (files && files.length > 0) {
    const newImages = extractImageNames(files);
    images = [...images, ...newImages];
  }

  return await updateSchoolUniformDB(id, {
    category: body.category ?? existing.category,
    schoolColor: body.schoolColor ?? existing.schoolColor,
    itemName: body.itemName ?? existing.itemName,
    sizes: body.sizes ?? existing.sizes,
    images,
  });
};
