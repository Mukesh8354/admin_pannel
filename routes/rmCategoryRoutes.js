import express from "express";
import {
  createRMCategory,
  getRMCategories,
  updateRMCategory,
  deleteRMCategory,
} from "../controllers/rmCategoryController.js";

const router = express.Router();

router.post("/", createRMCategory);
router.get("/", getRMCategories);
router.put("/:id", updateRMCategory); // ✅ UPDATE
router.delete("/:id", deleteRMCategory);

export default router;
