import db from "../../config/mysql.js";

/* ================= CREATE OR UPDATE ================= */
export const createOrUpdateReturnCloth = async (data) => {
  const {
    orderId,
    customerName,
    poNo,
    karigar,
    poDate,
    narration,
    totals,
    items,
  } = data;

  const conn = await db.getConnection();

  try {
    await conn.beginTransaction();

    /* 🔎 check existing (same as Mongo findOne) */
    const [existingRows] = await conn.query(
      `SELECT id FROM return_cloth
       WHERE order_id = ? AND po_no = ? AND karigar = ?`,
      [orderId, poNo, karigar]
    );

    let returnClothId;

    if (existingRows.length > 0) {
      // ================= UPDATE MASTER =================
      returnClothId = existingRows[0].id;

      await conn.query(
        `UPDATE return_cloth SET
          customer_name = ?,
          po_date = ?,
          narration = ?,
          total_return_qty = ?,
          used_qty = ?,
          planned_qty = ?,
          profit_qty = ?,
          loss_qty = ?
         WHERE id = ?`,
        [
          customerName,
          poDate,
          narration,
          totals.totalReturnQty,
          totals.usedQty,
          totals.plannedQty,
          totals.profitQty,
          totals.lossQty,
          returnClothId,
        ]
      );

      // ================= ITEMS UPSERT =================
      for (const item of items) {
        await conn.query(
          `INSERT INTO return_cloth_items
            (return_cloth_id, barcode, item_name, unit, width, issue_qty, return_qty)
           VALUES (?, ?, ?, ?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE
             return_qty = VALUES(return_qty)`,
          [
            returnClothId,
            item.barcode,
            item.itemName,
            item.unit,
            item.width,
            item.issueQty,
            item.returnQty,
          ]
        );
      }

      await conn.commit();

      return {
        updated: true,
        id: returnClothId,
      };
    }

    // ================= CREATE MASTER =================
    const [result] = await conn.query(
      `INSERT INTO return_cloth
        (order_id, customer_name, po_no, karigar, po_date, narration,
         total_issue_qty, total_return_qty, used_qty, planned_qty, profit_qty, loss_qty)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        orderId,
        customerName,
        poNo,
        karigar,
        poDate,
        narration,
        totals.totalIssueQty,
        totals.totalReturnQty,
        totals.usedQty,
        totals.plannedQty,
        totals.profitQty,
        totals.lossQty,
      ]
    );

    returnClothId = result.insertId;

    // ================= INSERT ITEMS =================
    for (const item of items) {
      await conn.query(
        `INSERT INTO return_cloth_items
          (return_cloth_id, barcode, item_name, unit, width, issue_qty, return_qty)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          returnClothId,
          item.barcode,
          item.itemName,
          item.unit,
          item.width,
          item.issueQty,
          item.returnQty,
        ]
      );
    }

    await conn.commit();

    return {
      created: true,
      id: returnClothId,
    };
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
};

/* ================= READ ================= */
export const getAllReturnCloth = async () => {
  const [rows] = await db.query(
    `SELECT * FROM return_cloth ORDER BY created_at DESC`
  );
  return rows;
};

export const getReturnClothById = async (id) => {
  const [master] = await db.query(`SELECT * FROM return_cloth WHERE id = ?`, [
    id,
  ]);

  if (!master.length) return null;

  const [items] = await db.query(
    `SELECT * FROM return_cloth_items WHERE return_cloth_id = ?`,
    [id]
  );

  return {
    ...master[0],
    items,
  };
};

/* ================= UPDATE ================= */
export const updateReturnClothById = async (id, data) => {
  await db.query(`UPDATE return_cloth SET ? WHERE id = ?`, [data, id]);
  return await getReturnClothById(id);
};

/* ================= DELETE ================= */
export const deleteReturnClothById = async (id) => {
  await db.query(`DELETE FROM return_cloth WHERE id = ?`, [id]);
};
