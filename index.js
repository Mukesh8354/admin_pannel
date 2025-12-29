import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
// import authRoutes from "./routes/authRouter.js";
import measurmentRoutes from "./routes/measurmentRoutes.js";
import productCategoryRoutes from "./routes/productCategoryRoutes.js";
import sizeGroupRoutes from "./routes/sizeGroupRoutes.js";
import KarigarRoutes from "./routes/KarigarRoutes.js";
import karigarLedgerRoutes from "./routes/karigarLedgerRoutes.js";
import homeUserRoutes from "./routes/homeUserRoutes.js";
import schoolColorRoutes from "./routes/schoolColorRoutes.js";
import sizeRoutes from "./routes/sizeRoutes.js";
import schoolUniformRoutes from "./routes/schoolUniformRoutes.js";
import rmCategoryRoutes from "./routes/rmCategoryRoutes.js";
import rawMaterialRoutes from "./routes/rawMaterialRoutes.js";
import averageRoutes from "./routes/averageRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

// app.use("/api/auth", authRoutes);
app.use("/api/measurements", measurmentRoutes);
app.use("/api/product-categories", productCategoryRoutes);
app.use("/api/karigar", KarigarRoutes);
app.use("/api/karigar-ledger", karigarLedgerRoutes);
app.use("/api/size-groups", sizeGroupRoutes);
app.use("/api/home-users", homeUserRoutes);

app.use("/api/school-colors", schoolColorRoutes);
app.use("/api/sizes", sizeRoutes);
app.use("/api/school-uniforms", schoolUniformRoutes);
app.use("/api/rm-categories", rmCategoryRoutes);

app.use("/api/uploads", express.static("uploads"));

app.use("/api/raw-materials", rawMaterialRoutes);

app.use("/api/average", averageRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
