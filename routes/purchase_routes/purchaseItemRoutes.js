import express from "express";
import {
  addPurchaseItem,
  getPurchaseItems,
} from "../../controllers/purchse_controller/purchaseItemController.js";

const router = express.Router();

router.post("/", addPurchaseItem);
router.get("/", getPurchaseItems);

export default router;
