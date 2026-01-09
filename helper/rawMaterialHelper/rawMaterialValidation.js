// helper/rawMaterialHelper/rawMaterialValidation.js

export const normalize = (v = "") => (typeof v === "string" ? v.trim() : v);

export const validateRawMaterial = (body) => {
  if (!body.category) return "Category is required";
  if (!body.itemName) return "Item name is required";
  if (!body.unit) return "Unit is required";
  return null;
};
