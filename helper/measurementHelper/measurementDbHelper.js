// import Measurement from "../../models/Measurement.js";

/*export const checkDuplicateMeasurement = async ({
  unit,
  description,
  excludeId = null,
}) => {
  return await Measurement.findOne({
    ...(excludeId && { _id: { $ne: excludeId } }),
    $or: [
      { unit: new RegExp(`^${unit}$`, "i") },
      description ? { description: new RegExp(`^${description}$`, "i") } : null,
      description ? { unit: new RegExp(`^${description}$`, "i") } : null,
      { description: new RegExp(`^${unit}$`, "i") },
    ].filter(Boolean),
  });
};*/

import db from "../../config/mysql.js";

export const checkDuplicateMeasurement = async ({
  unit,
  description,
  excludeId = null,
}) => {
  let sql = `
    SELECT * FROM measurements
    WHERE (
      LOWER(unit) = LOWER(?)
      OR LOWER(description) = LOWER(?)
      OR LOWER(unit) = LOWER(?)
      OR LOWER(description) = LOWER(?)
    )
  `;

  const params = [unit, description || "", description || "", unit];

  if (excludeId) {
    sql += " AND id != ?";
    params.push(excludeId);
  }

  const [rows] = await db.query(sql, params);

  return rows.length > 0 ? rows[0] : null;
};
