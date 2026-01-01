import mongoose from "mongoose";

const componentRowSchema = new mongoose.Schema(
  {
    basic: Number,
    label: Number,
    piping: Number,
    longpiping: Number,
    shoulder: Number,
    pocket: Number,
    flap: Number,
    fashion: Number,
    gallis: Number,
    extra: Number,
    baju: Number,
    waist: Number,
    ot1: Number,
    ot2: Number,
    ot3: Number,
    ot4: Number,
    ot5: Number,
    othersdescription: Number,
  },
  { _id: false }
);

const componentCostSchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    school: { type: String, required: true },
    size: { type: String, required: true },

    rows: [componentRowSchema],

    totalCost: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("ComponentCost", componentCostSchema);
