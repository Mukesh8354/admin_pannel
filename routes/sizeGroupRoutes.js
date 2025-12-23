import express from "express";
import { createSizeGroup } from "../controllers/sizeGroupController.js";

const router = express.Router();

router.post("/", createSizeGroup);

export default router;
