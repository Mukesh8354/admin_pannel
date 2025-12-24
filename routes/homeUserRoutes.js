import express from "express";
import {
  createHomeUser,
  getHomeUsers,
  updateHomeUser,
  deleteHomeUser,
} from "../controllers/homeUserController.js";

const router = express.Router();

router.post("/", createHomeUser);
router.get("/", getHomeUsers);
router.put("/:id", updateHomeUser);
router.delete("/:id", deleteHomeUser);

export default router;
