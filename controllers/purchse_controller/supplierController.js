import Supplier from "../../models/purchase_model/Supplier.js";

export const createSupplier = async (req, res) => {
  try {
    const {
      supplierName,
      contactNo,
      address1,
      address2,
      state,
      stateCode,
      country,
      gstin,
      remarks,
    } = req.body;

    const existingSupplier = await Supplier.findOne({
      supplierName: { $regex: `^${supplierName}$`, $options: "i" }, // case-insensitive
    });

    if (existingSupplier) {
      return res.status(400).json({
        message: "Supplier name already exists",
      });
    }

    if (!supplierName) {
      return res.status(400).json({ message: "Supplier name is required" });
    }

    // 🔢 Auto generate supplier code
    const lastSupplier = await Supplier.findOne().sort({ supplierCode: -1 });
    const supplierCode = lastSupplier ? lastSupplier.supplierCode + 1 : 1;

    const supplier = await Supplier.create({
      supplierCode,
      supplierName,
      contactNo,
      address1,
      address2,
      state,
      stateCode,
      country,
      gstin,
      remarks,
    });

    res.status(201).json({
      message: "Supplier created successfully",
      supplier,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find().sort({ supplierCode: 1 });
    res.status(200).json(suppliers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET supplier by id
export const getSupplierById = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);

    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    res.status(200).json(supplier);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
