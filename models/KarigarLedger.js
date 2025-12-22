import mongoose from "mongoose";

const ledgerSchema = new mongoose.Schema(
  {
    karigarId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Karigar",
      required: true,
    },
    date: { type: Date, default: Date.now },
    particular: String,
    debit: { type: Number, default: 0 },
    credit: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("KarigarLedger", ledgerSchema);
