import mongoose from "mongoose";

const averageRowSchema = new mongoose.Schema({
  size: { type: String, required: true },
  c89: Number,
  c112: Number,
  c137: Number,
  c142: Number,
  c147: Number,
});

const averageSchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    rows: [averageRowSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Average", averageSchema);
