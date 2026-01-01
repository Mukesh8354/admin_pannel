import mongoose from "mongoose";

const karigarSchema = new mongoose.Schema(
  {
    karigarName: { type: String, required: true },
    contactNo: { type: String },
    currentAddress: { type: String },
    permanentAddress: { type: String },

    documents: {
      idProof: String,
      addressProof: String,
      electricityBill: String,
      otherDocument: String,
      photo: String,
    },

    // 👉 CURRENT BALANCE (Amount To Be Paid)
    balanceAmount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Karigar", karigarSchema);
