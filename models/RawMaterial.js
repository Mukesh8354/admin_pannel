import mongoose from "mongoose";

const rawMaterialSchema = new mongoose.Schema(
  {
    category: String,
    itemName: String,
    designNo: String,
    hsnCode: String,
    unit: String,
    gst: Number,
    size: String,
    schoolColor: String,
    purchaseRate: Number,
    openingStock: Number,
    minimumStock: Number,
    maximumStock: Number,
    remarks: String,
    image: String, // 🔥 image filename
  },
  { timestamps: true }
);

export default mongoose.model("RawMaterial", rawMaterialSchema);
