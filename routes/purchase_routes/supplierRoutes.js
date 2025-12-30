import express from "express";
import {
  createSupplier,
  getSuppliers,
  getSupplierById,
} from "../../controllers/purchse_controller/supplierController.js";

const router = express.Router();

router.post("/", createSupplier);
router.get("/", getSuppliers);

router.get("/:id", getSupplierById);

export default router;
