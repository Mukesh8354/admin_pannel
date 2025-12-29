import express from "express";
import {
  createRawMaterial,
  getRawMaterials,
} from "../controllers/rawMaterialController.js";
import { upload } from "../middlerware/rawMaterialUpload.js";

const router = express.Router();

router.post("/", upload.single("image"), createRawMaterial);
router.get("/", getRawMaterials);

export default router;
