import express from "express";

import {
  addAdvancePayment,
  getLedgerList,
} from "../controllers/karigarLedgerController.js";

const router = express.Router();

router.post("/advance", addAdvancePayment);
router.get("/", getLedgerList);

export default router;
