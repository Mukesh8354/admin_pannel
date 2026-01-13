import express from "express";
import {
  createOrUpdateReturnCloth,
  getAllReturnCloth,
  getReturnClothById,
  updateReturnClothById,
  deleteReturnClothById,
} from "../../helper/production_helper/returnCloth.helper.js";

const router = express.Router();

/* ================= CREATE / UPDATE ================= */
router.post("/", async (req, res) => {
  try {
    const result = await createOrUpdateReturnCloth(req.body);

    res.status(result.created ? 201 : 200).json({
      success: true,
      ...result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
});

/* ================= READ ALL ================= */
router.get("/", async (req, res) => {
  try {
    const data = await getAllReturnCloth();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

/* ================= READ ONE ================= */
router.get("/:id", async (req, res) => {
  try {
    const data = await getReturnClothById(req.params.id);
    if (!data) return res.status(404).json({ success: false });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

/* ================= UPDATE ================= */
router.put("/:id", async (req, res) => {
  try {
    const data = await updateReturnClothById(req.params.id, req.body);
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

/* ================= DELETE ================= */
router.delete("/:id", async (req, res) => {
  try {
    await deleteReturnClothById(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
