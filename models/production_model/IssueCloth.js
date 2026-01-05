import mongoose from "mongoose";

const issueItemSchema = new mongoose.Schema({
  barcode: { type: String, required: true },
  itemName: { type: String, required: true },
  unit: String,
  hsn: String,
  gst: Number,
  width: Number,
  rate: Number,

  qty: { type: Number, required: true },
  taxableAmount: Number,
  taxAmount: Number,
  totalAmount: Number,

  deliveryDate: Date,
});

const issueClothSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },

    customerName: String,
    poNo: String,
    karigar: String,

    narration: String,

    totalQty: Number,
    totalTaxable: Number,
    totalTax: Number,
    grandTotal: Number,

    items: {
      type: [issueItemSchema],
      validate: [(v) => v.length > 0, "At least one item required"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("IssueCloth", issueClothSchema);
