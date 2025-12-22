import express from "express";
import Karigar from "../models/Karigar.js";

const router = express.Router();

// GET
router.get("/", async (req, res) => {
  res.json(await Karigar.find());
});

// POST
router.post("/", async (req, res) => {
  res.json(await Karigar.create(req.body));
});

export default router;
