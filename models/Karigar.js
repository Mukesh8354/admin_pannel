import mongoose from "mongoose";

const karigarSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    mobile: String,
    type: String,
    address: String,
  },
  { timestamps: true }
);

export default mongoose.model("Karigar", karigarSchema);
