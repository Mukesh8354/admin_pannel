import express from "express";
import {
  createAverage,
  getAverages,
  getAverageById,
  updateAverage,
  deleteAverage,
  createOrUpdateAverage,
} from "../controllers/averageController.js";

const router = express.Router();

router.post("/", createAverage);
router.get("/", getAverages);
router.get("/:id", getAverageById);
router.put("/:id", updateAverage);
router.delete("/:id", deleteAverage);
router.post("/", createOrUpdateAverage);

export default router;
