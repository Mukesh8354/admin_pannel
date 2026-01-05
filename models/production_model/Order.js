import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  item: String,
  school: String,
  size: String,
  rate: Number,
  qty: Number,
  amount: Number,
  priority: Number,
  details: String,
  deliveryDate: String,
});

const orderSchema = new mongoose.Schema(
  {
    poNo: String,
    poDate: String,
    deliveryDate: String,

    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },
    customerName: String,
    contactNo: String,
    address: String,

    karigar: String,

    orderItems: [orderItemSchema],
    totalAmount: Number,
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
