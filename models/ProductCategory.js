import mongoose from "mongoose";

const productCategorySchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    pressRate: Number,
    cuttingRate: Number,
    kajButtonRate: Number,
    description: String,
  },
  { timestamps: true }
);

export default mongoose.model(
  "ProductCategory",
  productCategorySchema
);
