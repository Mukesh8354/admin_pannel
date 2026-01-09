// helper/componentCostHelper/componentCostValidation.js

export const validateComponentCostRows = (rows = []) => {
  if (!Array.isArray(rows) || rows.length === 0) {
    return "Rows are required";
  }

  for (const r of rows) {
    if (!r.category || !r.school || !r.size) {
      return "Each row must have category, school and size";
    }
  }

  return null;
};
