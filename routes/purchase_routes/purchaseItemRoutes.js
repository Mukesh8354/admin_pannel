import express from "express";
import {
  addPurchaseItem,
  getPurchaseItems,
  getPurchaseItemsIssue,
} from "../../controllers/purchse_controller/purchaseItemController.js";

const router = express.Router();

router.post("/", addPurchaseItem);
router.get("/", getPurchaseItems);
router.get("/issue-items", getPurchaseItemsIssue);

export default router;
