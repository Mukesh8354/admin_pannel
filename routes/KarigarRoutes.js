import express from "express";
import {
  createKarigar,
  getKarigars,
  getKarigar,
  updateKarigar,
  deleteKarigar,
} from "../controllers/karigarController.js";
import { karigarUpload } from "../middlerware/karigarDataUpload.js";

const router = express.Router();

router.post(
  "/",
  karigarUpload.fields([
    { name: "idProof", maxCount: 1 },
    { name: "addressProof", maxCount: 1 },
    { name: "electricityBill", maxCount: 1 },
    { name: "otherDocument", maxCount: 1 },
    { name: "photo", maxCount: 1 },
  ]),
  createKarigar
);

router.get("/", getKarigars);
router.get("/:id", getKarigar);

router.put(
  "/:id",
  karigarUpload.fields([
    { name: "idProof", maxCount: 1 },
    { name: "addressProof", maxCount: 1 },
    { name: "electricityBill", maxCount: 1 },
    { name: "otherDocument", maxCount: 1 },
    { name: "photo", maxCount: 1 },
  ]),
  updateKarigar
);

router.delete("/:id", deleteKarigar);

export default router;
