import Order from "../../models/production_model/Order.js";

/* CREATE */
export const createOrder = async (req, res) => {
  try {
    const { poNo, orderItems } = req.body;

    // 1️⃣ Same PO No already exists?
    const poExists = await Order.findOne({ poNo });
    if (poExists) {
      return res.status(409).json({ message: "PO No already exists" });
    }

    // 2️⃣ Duplicate items remove (safety)
    const uniqueItems = [];
    const seen = new Set();

    for (const item of orderItems) {
      const key = `${item.item}-${item.school}-${item.size}-${item.deliveryDate}`;

      if (!seen.has(key)) {
        seen.add(key);
        uniqueItems.push(item);
      }
    }

    const order = new Order({
      ...req.body,
      orderItems: uniqueItems,
      totalAmount: uniqueItems.reduce((s, i) => s + i.amount, 0),
    });

    await order.save();

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* READ ALL */
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* READ ONE */
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* UPDATE */
export const updateOrder = async (req, res) => {
  try {
    const updated = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* DELETE */
export const deleteOrder = async (req, res) => {
  try {
    const deleted = await Order.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ message: "Order deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
