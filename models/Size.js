import mongoose from "mongoose";

const sizeSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true, // RM / FG
      trim: true,
    },
    size: {
      type: String,
      required: true, // e.g. 12x18
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Size", sizeSchema);
