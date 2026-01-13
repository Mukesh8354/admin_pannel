import db from "../../config/mysql.js";

/* ================= CREATE ================= */
export const createCuttingEntry = async (req, res) => {
  const {
    orderId,
    customerName,
    poNo,
    poDate,
    karigar,
    narration,
    summary = {},
    items = [],
  } = req.body;

  const conn = await db.getConnection();

  try {
    await conn.beginTransaction();

    // 1️⃣ cutting_entries
    const [entryResult] = await conn.query(
      `INSERT INTO cutting_entries
      (order_id, customer_name, po_no, po_date, karigar, narration, order_qty)
      VALUES (?,?,?,?,?,?,?)`,
      [
        orderId,
        customerName,
        poNo,
        poDate,
        karigar,
        narration,
        summary.orderQty,
      ]
    );

    const cuttingEntryId = entryResult.insertId;

    // 2️⃣ cutting_items + bundles
    for (const item of items) {
      const [itemResult] = await conn.query(
        `INSERT INTO cutting_items
        (cutting_entry_id, article_name, school, size, order_qty, cutting_rate, priority)
        VALUES (?,?,?,?,?,?,?)`,
        [
          cuttingEntryId,
          item.itemName,
          item.school,
          item.size,
          item.orderQty,
          Number(item.cuttingRate),
          item.priority,
        ]
      );

      const cuttingItemId = itemResult.insertId;

      for (const bundle of item.bundles || []) {
        await conn.query(
          `INSERT INTO cutting_bundles
          (cutting_item_id, item_name, size, bundle_no, pcs)
          VALUES (?,?,?,?,?)`,
          [cuttingItemId, item.itemName, item.size, bundle.bundleNo, bundle.pcs]
        );
      }
    }

    await conn.commit();
    res.status(201).json({ message: "Cutting entry created" });
  } catch (err) {
    await conn.rollback();
    console.error("CUTTING ENTRY ERROR:", err);
    res.status(500).json({ message: err.message });
  } finally {
    conn.release();
  }
};

/* ================= READ (GROUPED) ================= */
export const getCuttingSummary = async (req, res) => {
  const [rows] = await db.query(`
    SELECT
      order_id,
      MAX(customer_name) customerName,
      MAX(po_no) poNo,
      MAX(po_date) poDate,
      MAX(karigar) karigar,
      MAX(narration) narration,
      MAX(order_qty) orderQty,
      SUM(return_qty) totalReturnQty,
      MAX(created_at) createdAt
    FROM cutting_entries
    GROUP BY order_id
    ORDER BY createdAt DESC
  `);

  res.json(rows);
};

/* ================= READ BY ID ================= */
export const getCuttingById = async (req, res) => {
  const [entries] = await db.query(
    `SELECT * FROM cutting_entries WHERE id = ?`,
    [req.params.id]
  );

  if (!entries.length) {
    return res.status(404).json({ message: "Not found" });
  }

  const entry = entries[0];

  const [items] = await db.query(
    `SELECT * FROM cutting_items WHERE cutting_entry_id = ?`,
    [entry.id]
  );

  for (const item of items) {
    const [bundles] = await db.query(
      `SELECT * FROM cutting_bundles WHERE cutting_item_id = ?`,
      [item.id]
    );
    item.bundles = bundles;
  }

  entry.items = items;
  res.json(entry);
};

/* ================= UPDATE ================= */
export const updateCutting = async (req, res) => {
  await db.query(`UPDATE cutting_entries SET ? WHERE id = ?`, [
    req.body,
    req.params.id,
  ]);
  res.json({ message: "Updated successfully" });
};

/* ================= DELETE ================= */
export const deleteCutting = async (req, res) => {
  await db.query(`DELETE FROM cutting_entries WHERE id = ?`, [req.params.id]);
  res.json({ message: "Deleted successfully" });
};

/* ================= ORDER WISE ENTRIES ================= */
export const getCuttingByOrder = async (req, res) => {
  const [rows] = await db.query(
    `SELECT * FROM cutting_entries WHERE order_id = ?`,
    [req.params.orderId]
  );
  res.json(rows);
};

/* ================= BUNDLES (STITCHING ISSUE) ================= */
export const getBundlesByOrder = async (req, res) => {
  const [rows] = await db.query(
    `
    SELECT
      ce.id AS cuttingEntryId,
      cb.bundle_no AS bundleNo,
      cb.item_name AS itemName,
      cb.size,
      cb.pcs,
      ci.school,
      ci.cutting_rate AS cost,
      ci.priority
    FROM cutting_entries ce
    JOIN cutting_items ci ON ci.cutting_entry_id = ce.id
    JOIN cutting_bundles cb ON cb.cutting_item_id = ci.id
    WHERE ce.order_id = ?
    `,
    [req.params.orderId]
  );

  if (!rows.length) {
    return res.status(404).json({ message: "No cutting entries found" });
  }

  res.json(rows);
};

/* ================= ASYNC HANDLER ================= */
export const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);
