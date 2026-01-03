import PurchaseItem from "../../models/purchase_model/PurchaseItem.js";

// POST – save item
export const addPurchaseItem = async (req, res) => {
  try {
    const { supplierId, itemName, rate } = req.body;

    const existing = await PurchaseItem.findOne({
      supplierId,
      purchaseDate: req.body.purchaseDate,
    });

    if (existing) {
      return res.status(409).json({
        message: "Purchase already exists for this supplier & date",
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

export const getPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.find()
      .populate("supplierId", "supplierName") // 👈 IMPORTANT
      .sort({ createdAt: -1 });

    res.json(purchases);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
