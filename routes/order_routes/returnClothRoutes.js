import express from "express";
import mongoose from "mongoose";
import ReturnCloth from "../../models/production_model/ReturnCloth.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { orderId, poNo, karigar, narration, totals, items } = req.body;

    const orderObjectId = new mongoose.Types.ObjectId(orderId);

    const existing = await ReturnCloth.findOne({
      orderId: orderObjectId,
      poNo,
      karigar,
    });

    if (existing) {
      existing.totals.totalReturnQty += totals.totalReturnQty;
      existing.totals.usedQty = totals.usedQty;

      // 🔥 ADD THESE LINES
      existing.totals.plannedQty = totals.plannedQty;
      existing.totals.profitQty = totals.profitQty;
      existing.totals.lossQty = totals.lossQty;
      if (narration) {
        existing.narration = narration;
      }
      items.forEach((newItem) => {
        const oldItem = existing.items.find(
          (i) => i.barcode === newItem.barcode
        );

        if (oldItem) {
          oldItem.returnQty += newItem.returnQty;
          oldItem.usedQty = newItem.usedQty;
        } else {
          existing.items.push(newItem);
        }
      });

      await existing.save();

      return res.json({
        success: true,
        merged: true,
        data: existing,
      });
    }

    const doc = new ReturnCloth({
      ...req.body,
      orderId: orderObjectId,
    });

    await doc.save();

    res.status(201).json({
      success: true,
      created: true,
      data: doc,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// READ ALL
router.get("/", async (req, res) => {
  try {
    const list = await ReturnCloth.find().sort({ createdAt: -1 });
    res.json({ success: true, data: list });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// READ ONE
router.get("/:id", async (req, res) => {
  try {
    const doc = await ReturnCloth.findById(req.params.id);
    if (!doc) return res.status(404).json({ success: false });
    res.json({ success: true, data: doc });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updated = await ReturnCloth.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    await ReturnCloth.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
