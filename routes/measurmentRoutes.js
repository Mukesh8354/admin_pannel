import express from "express";
import {
  createMeasurement,
  getMeasurements,
  deleteMeasurement,
  updateMeasurement,
} from "../controllers/measurementController.js";

const router = express.Router();

router.post("/", createMeasurement);
router.get("/", getMeasurements);

router.put("/:id", updateMeasurement);
router.delete("/:id", deleteMeasurement);

export default router;
