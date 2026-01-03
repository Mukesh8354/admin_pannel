import mongoose from "mongoose";

const PurchaseSchema = new mongoose.Schema(
  {
    supplierId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
      required: true,
    },

    supplierName: String,
    contactNo: String,
    address: String,

    purchaseDate: Date,
    dueDate: Date,
    narration: String,

    taxableAmount: Number,
    taxAmount: Number,
    freightAmount: Number,
    freightGstPercent: Number,
    freightGstAmount: Number,
    totalAmount: Number,

    // 👇 TABLE DATA
    lumps: [
      {
        rmCategory: String,
        itemName: String,
        unit: String,
        width: Number,
        hsnCode: String,
        gstPercent: Number,
        rate: Number,
        quantity: Number,
        taxableAmount: Number,
        taxAmount: Number,
        totalAmount: Number,
        deliveryDate: Date,

        lumps: [
          {
            sn: Number,
            barcode: String,
            qty: Number,
            width: Number,
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Purchase", PurchaseSchema);
