import db from "../../config/mysql.js";
import {
  validatePurchase,
  calculateDueDate,
} from "../../helper/purchase/purchaseHelper.js";

export const addPurchaseItem = async (req, res) => {
  const conn = await db.getConnection();
  try {
    const error = validatePurchase(req.body);
    if (error) {
      return res.status(400).json({ message: error });
    }

    const {
      supplierId,
      supplierName,
      purchaseDate,
      creditDays,
      dueDate,
      narration,
      taxableAmount,
      taxAmount,
      freightAmount,
      freightGstPercent,
      freightGstAmount,
      totalAmount,
      items,
    } = req.body;

    const finalDueDate = calculateDueDate({
      purchaseDate,
      creditDays,
      dueDate,
    });

    await conn.beginTransaction();

    /* ===== INSERT PURCHASE ===== */
    const [purchaseResult] = await conn.query(
      `INSERT INTO purchase_items
  (supplier_id, supplier_name, purchase_date, credit_days, due_date,
   narration, taxable_amount, tax_amount, freight_amount,
   freight_gst_percent, freight_gst_amount, total_amount)
  VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        supplierId,
        supplierName,
        purchaseDate,
        creditDays,
        finalDueDate,
        narration,
        taxableAmount,
        taxAmount,
        freightAmount,
        freightGstPercent,
        freightGstAmount,
        totalAmount,
      ]
    );

    const purchaseId = purchaseResult.insertId;

    /* ===== INSERT ITEMS ===== */
    for (const item of items) {
      const [itemResult] = await conn.query(
        `INSERT INTO purchase_item_details
   (
     purchase_item_id,
     rm_category,
     item_name,
     unit,
     hsn_code,
     width,
     rate,
     quantity,
     gst_percent,
     taxable_amount,
     tax_amount,
     total_amount,
     delivery_date
   )
   VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        [
          purchaseId,
          item.rmCategory, // ✅
          item.itemName,
          item.unit, // ✅
          item.hsnCode, // ✅
          item.width, // ✅
          item.rate,
          item.quantity,
          item.gstPercent,
          item.taxableAmount,
          item.taxAmount,
          item.totalAmount,
          item.deliveryDate, // ✅
        ]
      );

      const purchaseItemDetailId = itemResult.insertId;

      /* 👇👇👇 YAHIN LUMPS ADD KARNA HAI 👇👇👇 */

      if (Array.isArray(item.lumps)) {
        for (const lump of item.lumps) {
          await conn.query(
            `INSERT INTO purchase_item_lumps
         (purchase_item_detail_id, barcode, qty, width)
         VALUES (?,?,?,?)`,
            [purchaseItemDetailId, lump.barcode, lump.qty, lump.width]
          );
        }
      }
    }

    await conn.commit();
    res.status(201).json({
      message: "Purchase saved successfully",
      purchaseId,
    });
  } catch (err) {
    await conn.rollback();
    console.error("PURCHASE SQL ERROR:", err);
    res.status(500).json({ message: err.message });
  } finally {
    conn.release();
  }
};

export const getPurchases = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT * FROM purchase_items ORDER BY created_at DESC`
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getPurchaseItemsIssue = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT
        l.id AS lump_id,
        l.barcode,
        l.qty,

        d.item_name        AS itemName,
        d.hsn_code         AS hsn,
        d.unit,
        d.gst_percent      AS gst,
        d.width,
        d.rate,

        d.taxable_amount   AS taxableAmount,
        d.tax_amount       AS taxAmount,
        d.total_amount     AS totalAmount,
        d.delivery_date    AS deliveryDate

      FROM purchase_item_lumps l
      JOIN purchase_item_details d
        ON d.id = l.purchase_item_detail_id
      JOIN purchase_items p
        ON p.id = d.purchase_item_id

      ORDER BY l.id DESC
    `);

    res.json(rows);
  } catch (err) {
    console.error("GET PURCHASE ITEMS ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

export const getPurchaseItems = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT * FROM purchase_items ORDER BY id DESC`
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
