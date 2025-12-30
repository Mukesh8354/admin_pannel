import express from "express";
import {
  createItemConsumption,
  getItemConsumptions,
} from "../controllers/itemConsumptionController.js";

const router = express.Router();

// POST - Save Item Consumption
router.post("/", createItemConsumption);
router.get("/", getItemConsumptions);

export default router;
