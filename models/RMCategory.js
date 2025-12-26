import mongoose from "mongoose";

const rmCategorySchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    description: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("RMCategory", rmCategorySchema);
