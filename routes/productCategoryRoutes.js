import express from "express";
import ProductCategory from "../models/ProductCategory.js";

const router = express.Router();

// GET ALL
router.get("/", async (req, res) => {
  const data = await ProductCategory.find();
  res.json(data);
});

// CREATE
router.post("/", async (req, res) => {
  const category = await ProductCategory.create(req.body);
  res.json(category);
});

// UPDATE
router.put("/:id", async (req, res) => {
  const updated = await ProductCategory.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

export default router;
