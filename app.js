import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import db from "./config/mysql.js";

// routes
import measurmentRoutes from "./routes/measurmentRoutes.js";
import productCategoryRoutes from "./routes/productCategoryRoutes.js";
import sizeGroupRoutes from "./routes/sizeGroupRoutes.js";
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
import customerRoutes from "./routes/customerRoutes.js";
import orderRoutes from "./routes/order_routes/orderRoutes.js";
import issueClothRoutes from "./routes/order_routes/issueClothRoutes.js";
import cuttingEntryRoutes from "./routes/order_routes/cuttingEntryRoutes.js";
import returnClothRoutes from "./routes/order_routes/returnClothRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DB connect
connectDB();

(async () => {
  try {
    const conn = await db.getConnection();
    console.log("✅ MySQL Connected");
    conn.release();
  } catch (err) {
    console.error("❌ MySQL Connection Failed", err);
  }
})();

// Routes
app.use("/api/measurements", measurmentRoutes);
app.use("/api/product-categories", productCategoryRoutes);
app.use("/api/karigar-ledger", karigarLedgerRoutes);
app.use("/api/size-groups", sizeGroupRoutes);
app.use("/api/home-users", homeUserRoutes);

app.use("/api/school-colors", schoolColorRoutes);
app.use("/api/sizes", sizeRoutes);
app.use("/api/school-uniforms", schoolUniformRoutes);
app.use("/api/rm-categories", rmCategoryRoutes);
app.use("/api/raw-materials", rawMaterialRoutes);

app.use("/api/average", averageRoutes);
app.use("/api/karigars", karigarRoutes);
app.use("/api/item-consumption", itemConsumptionRoutes);

// static uploads
app.use("/api/uploads", express.static("uploads"));

// Purchase
app.use("/api/suppliers", supplierRoutes);
app.use("/api/purchase-items", purchaseItemRoutes);

// Other
app.use("/api/component-costs", componentCostRoutes);
app.use("/api/aster-compositions", asterCompositionRoutes);
app.use("/api/customers", customerRoutes);

//Production
app.use("/api/orders", orderRoutes);
app.use("/api/issue-cloth", issueClothRoutes);
app.use("/api/cutting-entries", cuttingEntryRoutes);
app.use("/api/return-cloth", returnClothRoutes);

export default app;
