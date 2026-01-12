import express from "express";
import {
  createIssueCloth,
  getAllIssueCloth,
  getIssueClothById,
  updateIssueCloth,
  deleteIssueCloth,
} from "../../helper/production_helper/issueClothHelper.js";

const router = express.Router();

/* ================= CREATE ================= */
router.post("/", async (req, res) => {
  try {
    const issue = await createIssueCloth(req.body);
    res.status(201).json(issue);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/* ================= READ ALL ================= */
router.get("/", async (req, res) => {
  try {
    const list = await getAllIssueCloth();
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ================= READ ONE ================= */
router.get("/:id", async (req, res) => {
  try {
    const issue = await getIssueClothById(req.params.id);
    res.json(issue);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

/* ================= UPDATE ================= */
router.put("/:id", async (req, res) => {
  try {
    const updated = await updateIssueCloth(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

/* ================= DELETE ================= */
router.delete("/:id", async (req, res) => {
  try {
    await deleteIssueCloth(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

export default router;
