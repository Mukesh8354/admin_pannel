import mongoose from "mongoose";

const purchaseItemSchema = new mongoose.Schema(
  {
    supplierId: String,
    rmCategory: String,
    itemName: String,
    unit: String,
    hsnCode: String,

    rate: Number,
    quantity: Number,

    width: Number,

    gstPercent: Number,
    taxableAmount: Number,
    taxAmount: Number,
    totalAmount: Number,

    deliveryDate: String,

    lumps: Array,
  },
  { timestamps: true }
);

export default mongoose.model("PurchaseItem", purchaseItemSchema);
