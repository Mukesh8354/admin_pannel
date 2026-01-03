import Customer from "../models/Customer.js";

/**
 * ➕ CREATE CUSTOMER
 */
export const createCustomer = async (req, res) => {
  try {
    const {
      customerName,
      contactNo,
      address1,
      address2,
      state,
      stateCode,
      country,
      gstin,
      remarks,
    } = req.body;

    const existingCustomer = await Customer.findOne({
      customerName: { $regex: `^${customerName}$`, $options: "i" }, // case-insensitive
    });

    if (existingCustomer) {
      return res.status(400).json({
        message: "Customer name already exists",
      });
    }

    if (!customerName) {
      return res.status(400).json({ message: "Supplier name is required" });
    }

    // 🔴 validations
    if (!customerName || customerName.trim().length < 3) {
      return res.status(400).json({ message: "Customer name is invalid" });
    }

    if (!/^\d{10}$/.test(contactNo)) {
      return res.status(400).json({ message: "Invalid contact number" });
    }

    if (!address1) {
      return res.status(400).json({ message: "Address line 1 required" });
    }

    if (!state || !stateCode) {
      return res.status(400).json({ message: "State is required" });
    }

    if (
      gstin &&
      !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(gstin)
    ) {
      return res.status(400).json({ message: "Invalid GSTIN" });
    }

    // 🔢 Auto generate supplier code
    const lastCustomer = await Customer.findOne().sort({ customerCode: -1 });
    const customerCode = lastCustomer ? lastCustomer.customerCode + 1 : 1;

    const customer = await Customer.create({
      customerCode,
      customerName,
      contactNo,
      address1,
      address2,
      state,
      stateCode,
      country,
      gstin,
      remarks,
    });

    await customer.save();

    res.status(201).json(customer);
  } catch (err) {
    console.error("Create Customer Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * 📄 GET ALL CUSTOMERS
 */
export const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 });
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * ❌ DELETE CUSTOMER
 */
export const deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.json({ message: "Customer deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
