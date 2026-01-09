import express from "express";
import {
  getAllCategories,
  createCategory,
  updateCategoryById,
  deleteCategoryById,
} from "../helper/productCategoryHelper/productCategory.helper.js";

const router = express.Router();

// GET ALL
router.get("/", async (req, res) => {
  try {
    const data = await getAllCategories();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE
router.post("/", async (req, res) => {
  try {
    const category = await createCategory(req.body);
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updated = await updateCategoryById(req.params.id, req.body);

    if (!updated) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await deleteCategoryById(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Product category not found",
      });
    }

    res.json({
      success: true,
      message: "Product category deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;

/*import express from "express";
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

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await ProductCategory.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Product category not found",
      });
    }

    res.json({
      success: true,
      message: "Product category deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;*/
