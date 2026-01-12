// helper/averageHelper/averageService.js

import db from "../../config/mysql.js";

export const createAverageOneTableDB = async (category, rows = []) => {
  if (!rows.length) return;

  for (const r of rows) {
    await db.execute(
      `INSERT INTO averages
       (category, size, c89, c112, c137, c142, c147)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        category,
        r.size,
        r.c89 ?? 0,
        r.c112 ?? 0,
        r.c137 ?? 0,
        r.c142 ?? 0,
        r.c147 ?? 0,
      ]
    );
  }
};

// CREATE average
export const createAverageDB = async (category, rows) => {
  const values = rows.map((r) => [
    category,
    r.size,
    r.c89,
    r.c112,
    r.c137,
    r.c142,
    r.c147,
  ]);

  await db.query(
    `INSERT INTO averages 
     (category, size, c89, c112, c137, c142, c147)
     VALUES ?`,
    [values]
  );

  return { category, rows };
};

// GET ALL
// GET ALL (CORRECT)
export const getAveragesDB = async () => {
  const [rows] = await db.execute(
    "SELECT * FROM averages ORDER BY category, size"
  );

  const map = {};

  for (const r of rows) {
    if (!map[r.category]) {
      map[r.category] = {
        id: r.id,
        category: r.category,
        rows: [],
      };
    }

    map[r.category].rows.push({
      size: r.size,
      c89: r.c89,
      c112: r.c112,
      c137: r.c137,
      c142: r.c142,
      c147: r.c147,
    });
  }

  return Object.values(map);
};

// UPDATE category
export const updateAverageDB = async (id, data) => {
  const { category, size, c89, c112, c137, c142, c147 } = data;

  await db.execute(
    `UPDATE averages
     SET category=?, size=?, c89=?, c112=?, c137=?, c142=?, c147=?
     WHERE id=?`,
    [category, size, c89, c112, c137, c142, c147, id]
  );
};

// DELETE
export const deleteAverageDB = async (id) => {
  await db.execute("DELETE FROM averages WHERE id=?", [id]);
};

// INSERT rows (bulk)
export const insertAverageRowsDB = async (averageId, rows = []) => {
  const values = rows.map((r) => [averageId, r.size, JSON.stringify(r)]);

  await db.query("INSERT INTO average_rows (average_id, size, data) VALUES ?", [
    values,
  ]);
};

// UPSERT rows (merge logic)
export const upsertAverageRowsDB = async (averageId, rows = []) => {
  for (const r of rows) {
    await db.execute(
      `
      INSERT INTO average_rows (average_id, size, data)
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE data = VALUES(data)
      `,
      [averageId, r.size, JSON.stringify(r)]
    );
  }
};
