import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema(
  {
    supplierCode: {
      type: Number,
      unique: true,
      required: true,
    },
    supplierName: {
      type: String,
      required: true,
      trim: true,
    },
    contactNo: {
      type: String,
      trim: true,
      match: [/^\d{10}$/, "Contact must be 10 digits"],
    },
    address1: {
      type: String,
      trim: true,
    },
    address2: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    stateCode: {
      type: String,
      trim: true,
    },
    country: {
      type: String,
      default: "India",
    },
    gstin: {
      type: String,
      trim: true,
      match: [
        /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
        "Invalid GSTIN",
      ],
    },
    remarks: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Supplier", supplierSchema);
