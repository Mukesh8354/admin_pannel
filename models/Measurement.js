import mongoose from "mongoose";

const measurementSchema = new mongoose.Schema(
  {
    unit: { type: String, required: true },
    description: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Measurement", measurementSchema);
