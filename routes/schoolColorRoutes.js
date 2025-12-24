import express from "express";
import {
  createSchoolColor,
  getSchoolColors,
  updateSchoolColor,
  deleteSchoolColor,
} from "../controllers/schoolColorController.js";

const router = express.Router();

router.post("/", createSchoolColor);
router.get("/", getSchoolColors);
router.put("/:id", updateSchoolColor);
router.delete("/:id", deleteSchoolColor);

export default router;
