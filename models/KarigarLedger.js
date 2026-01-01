import mongoose from "mongoose";
// models/KarigarLedger.js
const karigarLedgerSchema = new mongoose.Schema(
  {
    karigarId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Karigar",
      required: true,
    },
    description: String,
    credit: Number, // payment given (advance)
    debit: Number, // work amount (optional future use)
    balanceAfter: Number,
    date: Date,
  },
  { timestamps: true }
);

export default mongoose.model("KarigarLedger", karigarLedgerSchema);
