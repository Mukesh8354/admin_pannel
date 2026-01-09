export const validateSchoolUniform = ({ category, schoolColor, itemName }) => {
  if (!category || !schoolColor || !itemName) {
    return "Category, School Color and Item Name are required";
  }
  return null;
};

export const extractImageNames = (files = []) => {
  return files
    .filter((file) => file && file.filename && file.filename.includes("."))
    .map((file) => file.filename);
};
