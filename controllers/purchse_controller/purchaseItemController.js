import PurchaseItem from "../../models/purchase_model/PurchaseItem.js";

// POST – save item
export const addPurchaseItem = async (req, res) => {
  try {
    const { supplierId, itemName, rate } = req.body;

    const existingItem = await PurchaseItem.findOne({
      supplierId,
      itemName,
      rate,
    });

    if (existingItem) {
      return res.status(409).json({
        message: "Duplicate item not allowed",
      });
    }
    const item = new PurchaseItem(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET – fetch items
export const getPurchaseItems = async (req, res) => {
  try {
    const items = await PurchaseItem.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
