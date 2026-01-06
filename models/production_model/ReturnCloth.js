import mongoose from "mongoose";

const ReturnClothSchema = new mongoose.Schema(
  {
    orderId: mongoose.Schema.Types.ObjectId,
    customerName: String,
    poNo: String,
    karigar: String,
    poDate: String,
    narration: String,

    totals: {
      totalIssueQty: Number,
      totalReturnQty: Number,
      usedQty: Number,
    },

    items: [
      {
        barcode: String,
        itemName: String,
        unit: String,
        width: Number,
        issueQty: Number,
        returnQty: Number,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("ReturnCloth", ReturnClothSchema);
