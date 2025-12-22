import express from "express";
import KarigarLedger from "../models/KarigarLedger.js";

const router = express.Router();

// GET by Karigar
router.get("/:karigarId", async (req, res) => {
  const data = await KarigarLedger.find({
    karigarId: req.params.karigarId,
  }).populate("karigarId", "name");

  res.json(data);
});

// POST
router.post("/", async (req, res) => {
  res.json(await KarigarLedger.create(req.body));
});

export default router;
