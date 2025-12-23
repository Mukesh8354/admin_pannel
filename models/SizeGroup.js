import mongoose from "mongoose";

const sizeGroupSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      trim: true,
    },
    sizes: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("SizeGroup", sizeGroupSchema);
