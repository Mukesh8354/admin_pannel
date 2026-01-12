import db from "../../config/mysql.js";

/* ================= CREATE ================= */
export const createIssueCloth = async (data) => {
  const conn = await db.getConnection();
  try {
    const {
      orderId,
      customerName,
      poNo,
      karigar,
      narration,
      totalQty,
      totalTaxable,
      totalTax,
      grandTotal,
      items,
    } = data;

    if (!orderId || !items || items.length === 0) {
      throw new Error("Invalid data");
    }

    await conn.beginTransaction();

    // 1️⃣ Insert issue_cloths
    const [issueResult] = await conn.query(
      `INSERT INTO issue_cloths
       (order_id, customer_name, po_no, karigar, narration,
        total_qty, total_taxable, total_tax, grand_total)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        orderId,
        customerName,
        poNo,
        karigar,
        narration,
        totalQty,
        totalTaxable,
        totalTax,
        grandTotal,
      ]
    );

    const issueClothId = issueResult.insertId;

    // 2️⃣ Insert items
    for (const item of items) {
      await conn.query(
        `INSERT INTO issue_cloth_items
         (issue_cloth_id, barcode, item_name, unit, hsn, gst,
          width, rate, qty, taxable_amount, tax_amount, total_amount, delivery_date)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          issueClothId,
          item.barcode,
          item.itemName,
          item.unit,
          item.hsn,
          item.gst,
          item.width,
          item.rate,
          item.qty,
          item.taxableAmount,
          item.taxAmount,
          item.totalAmount,
          item.deliveryDate,
        ]
      );
    }

    await conn.commit();
    return { id: issueClothId, message: "Issue cloth created" };
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
};

/* ================= READ ALL ================= */
export const getAllIssueCloth = async () => {
  const [rows] = await db.query(
    `SELECT * FROM issue_cloths ORDER BY created_at DESC`
  );
  return rows;
};

/* ================= READ ONE ================= */
export const getIssueClothById = async (id) => {
  const [issueRows] = await db.query(
    `SELECT * FROM issue_cloths WHERE id = ?`,
    [id]
  );

  if (issueRows.length === 0) throw new Error("Not found");

  const [items] = await db.query(
    `SELECT * FROM issue_cloth_items WHERE issue_cloth_id = ?`,
    [id]
  );

  return { ...issueRows[0], items };
};

/* ================= UPDATE ================= */
export const updateIssueCloth = async (id, data) => {
  const [result] = await db.query(`UPDATE issue_cloths SET ? WHERE id = ?`, [
    data,
    id,
  ]);

  if (result.affectedRows === 0) throw new Error("Issue not found");
  return { message: "Updated successfully" };
};

/* ================= DELETE ================= */
export const deleteIssueCloth = async (id) => {
  const [result] = await db.query(`DELETE FROM issue_cloths WHERE id = ?`, [
    id,
  ]);

  if (result.affectedRows === 0) throw new Error("Issue not found");
  return { message: "Deleted successfully" };
};
