import express from "express";
import {
  createSizeGroup,
  getSizeGroups,
  deleteSizeGroup,
  updateSizeGroup,
  getSizeMapping,
} from "../controllers/sizeGroupController.js";

const router = express.Router();

router.post("/", createSizeGroup);
router.get("/", getSizeGroups);
router.put("/:id", updateSizeGroup);
router.delete("/:id", deleteSizeGroup);
router.get("/:category", getSizeMapping);

export default router;
