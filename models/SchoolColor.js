import mongoose from "mongoose";

const schoolColorSchema = new mongoose.Schema(
  {
    schoolColor: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true, // 🔁 duplicate prevent
    },
    description: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("SchoolColor", schoolColorSchema);
