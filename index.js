import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
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
import karigarRoutes from "./routes/KarigarRoutes.js";
import itemConsumptionRoutes from "./routes/itemConsumptionRoutes.js";

import supplierRoutes from "./routes/purchase_routes/supplierRoutes.js";
import purchaseItemRoutes from "./routes/purchase_routes/purchaseItemRoutes.js";
import componentCostRoutes from "./routes/componentCostRoutes.js";
import asterCompositionRoutes from "./routes/asterCompositionRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

// app.use("/api/auth", authRoutes);
app.use("/api/measurements", measurmentRoutes);
app.use("/api/product-categories", productCategoryRoutes);
// app.use("/api/karigar", KarigarRoutes);
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

app.use("/api/karigars", karigarRoutes);

app.use("/api/item-consumption", itemConsumptionRoutes);

//Purchase Api
app.use("/api/suppliers", supplierRoutes);

app.use("/api/component-costs", componentCostRoutes);

app.use("/api/purchase-items", purchaseItemRoutes);
app.use("/api/aster-compositions", asterCompositionRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
