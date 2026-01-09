// helper/averageHelper/averageMergeHelper.js

// ❌ Duplicate size check
export const checkDuplicateSizes = (existingRows = [], newRows = []) => {
  const existingSizes = new Set(existingRows.map((r) => r.size));

  for (const row of newRows) {
    if (existingSizes.has(row.size)) {
      return row.size;
    }
  }
  return null;
};

// ✅ Merge rows (for response / logic)
export const mergeRowsBySize = (oldRows = [], newRows = []) => {
  const map = new Map();

  oldRows.forEach((r) => map.set(r.size, r));
  newRows.forEach((r) => map.set(r.size, r));

  return Array.from(map.values());
};
