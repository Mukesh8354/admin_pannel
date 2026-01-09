// helper/schoolColorHelper/normalize.js

export const normalizeText = (v = "") =>
  v
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[_\-]+/g, " ")
    .replace(/\s+/g, " ");
