import db from "../../config/mysql.js";
import {
  checkDuplicatePO,
  removeDuplicateItems,
  calculateTotalAmount,
  fetchOrders,
  fetchOrderById,
  deleteOrderById,
} from "../../helper/production_helper/orderHelper.js";

/* CREATE */

export const createOrder = async (req, res) => {
  try {
    const {
      poNo,
      poDate,
      deliveryDate,
      customerId,
      customerName,
      contactNo,
      address,
      karigar,
      orderItems,
    } = req.body;

    if (await checkDuplicatePO(poNo)) {
      return res.status(409).json({ message: "PO No already exists" });
    }

    const items = removeDuplicateItems(orderItems);
    const totalAmount = calculateTotalAmount(items);

    // ✅ FULL INSERT
    const [orderRes] = await db.query(
      `INSERT INTO orders
      (po_no, po_date, delivery_date, customer_id, customer_name, contact_no, address, karigar, total_amount)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        poNo,
        poDate,
        deliveryDate,
        customerId,
        customerName,
        contactNo,
        address,
        karigar,
        totalAmount,
      ]
    );

    const orderId = orderRes.insertId;

    // order_items insert
    for (const i of items) {
      await db.query(
        `INSERT INTO order_items
        (order_id, item, school, size, rate, qty, amount, priority, details, delivery_date)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          orderId,
          i.item,
          i.school,
          i.size,
          i.rate,
          i.qty,
          i.amount,
          i.priority,
          i.details,
          i.deliveryDate,
        ]
      );
    }

    res.status(201).json({ message: "Order created", orderId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/*export const createOrder = async (req, res) => {
  try {
    const { poNo, orderItems } = req.body;

    if (await checkDuplicatePO(poNo)) {
      return res.status(409).json({ message: "PO No already exists" });
    }

    const items = removeDuplicateItems(orderItems);
    const totalAmount = calculateTotalAmount(items);

    const [orderRes] = await db.query(
      "INSERT INTO orders (po_no, total_amount) VALUES (?, ?)",
      [poNo, totalAmount]
    );

    const orderId = orderRes.insertId;

    for (const i of items) {
      await db.query(
        `INSERT INTO order_items
        (order_id, item, school, size, qty, rate, amount, delivery_date)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          orderId,
          i.item,
          i.school,
          i.size,
          i.qty,
          i.rate,
          i.amount,
          i.delivery_date,
        ]
      );
    }

    res.status(201).json({ message: "Order created", orderId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};*/

/* READ ALL */
export const getOrders = async (req, res) => {
  try {
    res.json(await fetchOrders());
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* READ ONE */
export const getOrderById = async (req, res) => {
  try {
    const order = await fetchOrderById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* DELETE */
export const deleteOrder = async (req, res) => {
  try {
    if (!(await deleteOrderById(req.params.id)))
      return res.status(404).json({ message: "Order not found" });

    res.json({ message: "Order deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
