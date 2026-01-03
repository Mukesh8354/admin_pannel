import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    customerCode: {
      type: String,
      trim: true,
      unique: true,
      sparse: true,
    },

    customerName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },

    contactNo: {
      type: String,
      required: true,
      match: /^[0-9]{10}$/,
    },

    address1: {
      type: String,
      required: true,
      trim: true,
    },

    address2: {
      type: String,
      trim: true,
    },

    state: {
      type: String,
      required: true,
    },

    stateCode: {
      type: String,
      required: true,
    },

    country: {
      type: String,
      default: "India",
    },

    gstin: {
      type: String,
      uppercase: true,
      match: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
    },

    remarks: {
      type: String,
      maxlength: 200,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Customer", customerSchema);
