import express from "express";
import {
  createCustomer,
  getCustomers,
  deleteCustomer,
} from "../controllers/customerController.js";

const router = express.Router();

router.post("/", createCustomer); // ➕ Add
router.get("/", getCustomers); // 📄 List
router.delete("/:id", deleteCustomer); // ❌ Delete

export default router;
