import PurchaseItem from "../../models/purchase_model/PurchaseItem.js";

export const addPurchaseItem = async (req, res) => {
  try {
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

    // ✅ BASIC VALIDATION
    if (!supplierId) {
      return res.status(400).json({ message: "supplierId required" });
    }

    if (!purchaseDate) {
      return res.status(400).json({ message: "purchaseDate required" });
    }

    if (!items || !items.length) {
      return res.status(400).json({ message: "At least one item required" });
    }

    // ✅ SAFE dueDate fallback
    let finalDueDate = dueDate;
    if (!finalDueDate && purchaseDate && creditDays) {
      const d = new Date(purchaseDate);
      d.setDate(d.getDate() + Number(creditDays));
      finalDueDate = d.toISOString().split("T")[0];
    }

    const purchase = await PurchaseItem.create({
      supplierId,
      supplierName,
      purchaseDate,
      creditDays,
      dueDate: finalDueDate,
      narration,
      taxableAmount,
      taxAmount,
      freightAmount,
      freightGstPercent,
      freightGstAmount,
      totalAmount,
      items,
    });

    res.status(201).json(purchase);
  } catch (err) {
    console.error("PURCHASE SAVE ERROR:", err);
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
    const purchases = await PurchaseItem.find()
      .populate("supplierId", "supplierName")
      .sort({ createdAt: -1 });

    res.json(purchases);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
