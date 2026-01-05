import express from "express";
import IssueCloth from "../../models/production_model/IssueCloth.js";

const router = express.Router();

/* ================= CREATE ================= */
router.post("/", async (req, res) => {
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
    } = req.body;

    if (!orderId || !items || items.length === 0) {
      return res.status(400).json({ message: "Invalid data" });
    }

    const issue = new IssueCloth({
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
    });

    await issue.save();

    res.status(201).json(issue);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ================= READ ALL ================= */
router.get("/", async (req, res) => {
  try {
    const list = await IssueCloth.find()
      .populate("orderId", "poNo customerName")
      .sort({ createdAt: -1 });

    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ================= READ ONE ================= */
router.get("/:id", async (req, res) => {
  try {
    const issue = await IssueCloth.findById(req.params.id);
    if (!issue) return res.status(404).json({ message: "Not found" });
    res.json(issue);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ================= UPDATE ================= */
router.put("/:id", async (req, res) => {
  try {
    const updated = await IssueCloth.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Issue not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ================= DELETE ================= */
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await IssueCloth.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Issue not found" });
    }

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
