import express from "express";
import {
  createComponentCost,
  getComponentCosts,
} from "../controllers/componentCostController.js";

const router = express.Router();

router.post("/", createComponentCost);
router.get("/", getComponentCosts);

export default router;
