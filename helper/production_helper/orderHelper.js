import db from "../../config/mysql.js";

/* PO duplicate */
export const checkDuplicatePO = async (poNo) => {
  const [rows] = await db.query("SELECT id FROM orders WHERE po_no = ?", [
    poNo,
  ]);
  return rows.length > 0;
};

/* Remove duplicate items */
export const removeDuplicateItems = (items) => {
  const unique = [];
  const seen = new Set();

  for (const i of items) {
    const key = `${i.item}-${i.school}-${i.size}-${i.delivery_date}`;
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(i);
    }
  }
  return unique;
};

/* Total amount */
export const calculateTotalAmount = (items) => {
  return items.reduce((s, i) => s + Number(i.amount || 0), 0);
};

/* Fetch all orders */
export const fetchOrders = async () => {
  const [rows] = await db.query(
    "SELECT * FROM orders ORDER BY created_at DESC"
  );
  return rows;
};

/* Fetch order with items */
export const fetchOrderById = async (id) => {
  const [[order]] = await db.query("SELECT * FROM orders WHERE id = ?", [id]);
  if (!order) return null;

  const [items] = await db.query(
    "SELECT * FROM order_items WHERE order_id = ?",
    [id]
  );

  order.orderItems = items;
  return order;
};

/* Delete order */
export const deleteOrderById = async (id) => {
  const [res] = await db.query("DELETE FROM orders WHERE id = ?", [id]);
  return res.affectedRows > 0;
};
