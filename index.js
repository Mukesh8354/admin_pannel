import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRouter.js";
import productCategoryRoutes from "./routes/productCategoryRoutes.js";

import KarigarRoutes from "./routes/KarigarRoutes.js";
import karigarLedgerRoutes from "./routes/karigarLedgerRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

// app.use("/api/auth", authRoutes);
app.use("/api/measurements", authRoutes);
app.use("/api/product-categories", productCategoryRoutes);
app.use("/api/karigar", KarigarRoutes);
app.use("/api/karigar-ledger", karigarLedgerRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
