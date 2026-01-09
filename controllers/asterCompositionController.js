import db from "../config/mysql.js";

/* ================= SAVE / UPSERT ================= */
export const saveAsterComposition = async (req, res) => {
  const { category, sizes } = req.body;

  if (!category || !Array.isArray(sizes) || sizes.length === 0) {
    return res.status(400).json({ message: "Invalid data" });
  }

  const conn = await db.getConnection();

  try {
    await conn.beginTransaction();

    // 1️⃣ Check if category already exists
    const [existing] = await conn.query(
      "SELECT id FROM aster_compositions WHERE category = ?",
      [category]
    );

    let compositionId;

    if (existing.length > 0) {
      // UPDATE case
      compositionId = existing[0].id;

      // delete old sizes
      await conn.query(
        "DELETE FROM aster_composition_sizes WHERE aster_composition_id = ?",
        [compositionId]
      );
    } else {
      // INSERT case
      const [result] = await conn.query(
        "INSERT INTO aster_compositions (category) VALUES (?)",
        [category]
      );
      compositionId = result.insertId;
    }

    // 2️⃣ Insert new sizes
    for (const s of sizes) {
      await conn.query(
        `
        INSERT INTO aster_composition_sizes
        (aster_composition_id, size, value)
        VALUES (?, ?, ?)
        `,
        [compositionId, s.size, s.value]
      );
    }

    await conn.commit();

    res.status(200).json({
      id: compositionId,
      category,
      sizes,
    });
  } catch (err) {
    await conn.rollback();
    res.status(500).json({ message: err.message });
  } finally {
    conn.release();
  }
};

export const getAsterCompositions = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT
        ac.id,
        ac.category,
        ac.created_at,
        s.size,
        s.value
      FROM aster_compositions ac
      LEFT JOIN aster_composition_sizes s
        ON ac.id = s.aster_composition_id
      ORDER BY ac.created_at DESC
    `);

    // Group sizes (Mongo-like output)
    const map = {};
    rows.forEach((r) => {
      if (!map[r.id]) {
        map[r.id] = {
          id: r.id,
          category: r.category,
          sizes: [],
        };
      }
      if (r.size) {
        map[r.id].sizes.push({
          size: r.size,
          value: r.value,
        });
      }
    });

    res.json(Object.values(map));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
