import express from "express";
import {
  saveAsterComposition,
  getAsterCompositions,
} from "../controllers/asterCompositionController.js";

const router = express.Router();

router.post("/", saveAsterComposition);
router.get("/", getAsterCompositions);

export default router;
