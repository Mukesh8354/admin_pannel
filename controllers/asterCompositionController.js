import db from "../config/mysql.js";

/* ================= SAVE / UPSERT ================= */
export const saveAsterComposition = async (req, res) => {
  try {
    const { category, sizes } = req.body;

    const sql = `
      INSERT INTO aster_compositions (category, sizes)
      VALUES (?, ?)
      ON DUPLICATE KEY UPDATE
      sizes = VALUES(sizes)
    `;

    await db.query(sql, [
      category,
      JSON.stringify(Array.isArray(sizes) ? sizes : []),
    ]);

    res.json({ message: "Aster composition saved / updated" });
  } catch (err) {
    console.error("POST ASTER ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

export const getAsterCompositions = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id, category, sizes FROM aster_compositions"
    );

    const formatted = rows.map((row) => ({
      ...row,
      sizes: row.sizes ? JSON.parse(row.sizes) : [], // ✅ IMPORTANT
    }));

    res.json(formatted);
  } catch (err) {
    console.error("GET ASTER ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};
