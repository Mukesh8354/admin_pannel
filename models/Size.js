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
      match: [
        /^(\d+|\d+x\d+|[a-zA-Z0-9]+)$/,
        "Size must be numeric (28), dimension (12x18), or alphanumeric (XL, M32)",
      ],
    },
    description: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Size", sizeSchema);
