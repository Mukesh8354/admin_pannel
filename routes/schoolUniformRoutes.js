import express from "express";
import {
  createSchoolUniform,
  getSchoolUniforms,
  deleteSchoolUniform,
  updateSchoolUniform,
} from "../controllers/schoolUniformDbController.js";
import { upload } from "../middlerware/upload.js";

const router = express.Router();

router.post("/", upload.array("images", 6), createSchoolUniform);
router.get("/", getSchoolUniforms);
router.put("/:id", upload.array("images", 6), updateSchoolUniform);
router.delete("/:id", deleteSchoolUniform);

export default router;
