import mongoose from "mongoose";

const schoolUniformSchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    schoolColor: { type: String, required: true },
    itemName: { type: String, required: true },
    sizes: [{ type: String }],
    images: [{ type: String }], // future use
  },
  { timestamps: true }
);

export default mongoose.model("SchoolUniform", schoolUniformSchema);
