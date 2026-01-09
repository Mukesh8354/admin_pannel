import mongoose from "mongoose";

const BundleSchema = new mongoose.Schema(
  {
    itemName: String,
    size: Number,
    bundleNo: Number,
    pcs: Number,
  },
  { _id: false }
);

const CuttingItemSchema = new mongoose.Schema(
  {
    articleName: String,
    school: String,
    size: String,
    orderQty: Number,
    returnedQty: Number,
    returnQty: Number,
    cuttingRate: Number,
    cuttingAmt: Number,
    priority: String,
    details: String,
    bundles: [BundleSchema],
  },
  { _id: false }
);

const CuttingEntrySchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },

    customerName: String,
    poNo: String,
    poDate: String,
    karigar: String,
    narration: String,

    summary: {
      orderQty: Number,
      returnedQty: Number,
      returnQty: Number,
      balanceQty: Number,
      totalCuttingAmt: Number,
    },

    items: [CuttingItemSchema],
  },
  { timestamps: true }
);

export default mongoose.model("CuttingEntry", CuttingEntrySchema);
