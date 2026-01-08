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
      plannedQty: Number,
      profitQty: Number,
      lossQty: Number,
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

ReturnClothSchema.index({ orderId: 1, poNo: 1, karigar: 1 }, { unique: true });

export default mongoose.model("ReturnCloth", ReturnClothSchema);
