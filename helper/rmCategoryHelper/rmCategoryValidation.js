// helper/rmCategoryHelper/rmCategoryValidation.js

export const isOnlyText = (value = "") => /^[a-zA-Z\s]+$/.test(value);

export const hasMinLength = (value, min = 2) => value.length >= min;

export const hasThreeRepeatedLetters = (value = "") =>
  /(.)\1\1/.test(value.replace(/\s+/g, ""));

export const hasRepeatedWord = (value = "") => {
  const v = value.replace(/\s+/g, "").toLowerCase();
  return (
    v.length % 2 === 0 && v.slice(0, v.length / 2) === v.slice(v.length / 2)
  );
};

export const isValidCategory = (value = "") =>
  /^[A-Za-z]+( [A-Za-z]+)?$/.test(value);

export const normalize = (v = "") =>
  typeof v === "string"
    ? v
        .trim()
        .toLowerCase()
        .replace(/[_\-]+/g, " ")
    : "";

export const validateRMCategory = (category) => {
  if (!category) return "Category is required";

  if (!isOnlyText(category)) return "Category must contain only letters";

  if (!hasMinLength(category, 2))
    return "Category must be at least 2 characters long";

  if (hasThreeRepeatedLetters(category))
    return "Same letter cannot repeat more than 2 times";

  if (hasRepeatedWord(category)) return "Repeated word is not allowed";

  if (!isValidCategory(category))
    return "Category must be one or two words only, letters allowed, single space between words";

  return null;
};
