import mongoose from "mongoose";

const sizeValueSchema = new mongoose.Schema({
  size: { type: String, required: true },
  value: { type: Number, required: true },
});

const asterCompositionSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      unique: true, // 👈 category repeat nahi hogi
      trim: true,
    },
    sizes: [sizeValueSchema],
  },
  { timestamps: true }
);

export default mongoose.model("AsterComposition", asterCompositionSchema);
