import express from "express";
import ReturnCloth from "../../models/production_model/ReturnCloth.js";

const router = express.Router();

// CREATE
router.post("/", async (req, res) => {
  try {
    const doc = new ReturnCloth(req.body);
    await doc.save();
    res.status(201).json({ success: true, data: doc });
  } catch (err) {
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
