// sirf normal JS functions

export const normalize = (v = "") => v.toString().trim().toLowerCase();

export const isOnlyText = (value) => /^[A-Za-z]+$/.test(value);

export const hasMinLength = (value, min = 2) => value.length >= min;

export const hasThreeRepeatedLetters = (value) =>
  /(.)\1\1/.test(value.toLowerCase());
