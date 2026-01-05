import mongoose from "mongoose";

const LumpSchema = new mongoose.Schema(
  {
    barcode: String,
    qty: Number,
    width: Number,
  },
  { _id: false }
);

const PurchaseItemDetailSchema = new mongoose.Schema(
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
    deliveryDate: String,

    // ✅ LUMPS INSIDE ITEM
    lumps: [LumpSchema],
  },
  { _id: false }
);

const PurchaseItemSchema = new mongoose.Schema(
  {
    supplierId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
      required: true,
    },
    supplierName: String,

    purchaseDate: String,
    creditDays: Number,
    dueDate: String,
    narration: String,

    taxableAmount: Number,
    taxAmount: Number,
    freightAmount: Number,
    freightGstPercent: Number,
    freightGstAmount: Number,
    totalAmount: Number,

    // ✅ ITEMS ARRAY
    items: [PurchaseItemDetailSchema],
  },
  { timestamps: true }
);

export default mongoose.model("PurchaseItem", PurchaseItemSchema);

/*const purchaseItemSchema = new mongoose.Schema(
  {
    supplierId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
      required: true,
    },

    supplierName: String,
    contactNo: String,
    address: String,

    purchaseDate: {
      type: String, // "2025-12-23"
      required: true,
    },

    creditDays: {
      type: Number, // 👈 THIS IS "DUE ON" (60)
      default: 0,
    },

    dueDate: {
      type: String, // auto calculated date
    },

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

        lumps: [LumpSchema],
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("PurchaseItem", purchaseItemSchema);*/
