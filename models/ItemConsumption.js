import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  fgCategory: String,
  rmItem: String,
  rmCategory: String,
  schoolColor: String,
  unit: String,
  quantity: String,
  description: String,
});

const itemConsumptionSchema = new mongoose.Schema(
  {
    fgCategory: String,
    schoolColor: String,
    date: String,
    items: [itemSchema],
  },
  { timestamps: true }
);

export default mongoose.model("ItemConsumption", itemConsumptionSchema);
