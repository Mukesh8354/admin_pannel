import db from "../../config/mysql.js";
import {
  validateSupplier,
  isSupplierNameExists,
  generateSupplierCode,
} from "../../helper/supplier/supplierHelper.js";

export const createSupplier = async (req, res) => {
  try {
    // ✅ validation
    const error = validateSupplier(req.body);
    if (error) {
      return res.status(400).json({ message: error });
    }

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

    // ✅ duplicate check
    const exists = await isSupplierNameExists(supplierName);
    if (exists) {
      return res.status(400).json({
        message: "Supplier name already exists",
      });
    }

    // ✅ auto supplier code
    const supplierCode = await generateSupplierCode();

    const cleanGstin = gstin && gstin.trim() !== "" ? gstin : null;

    const [result] = await db.query(
      `INSERT INTO suppliers 
  (supplierCode, supplierName, contactNo, address1, address2, state, stateCode, country, gstin, remarks)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        supplierCode,
        supplierName,
        contactNo,
        address1,
        address2,
        state,
        stateCode,
        country,
        cleanGstin, // ✅ NULL instead of ''
        remarks,
      ]
    );

    res.status(201).json({
      message: "Supplier created successfully",
      supplierId: result.insertId,
      supplierCode,
    });
  } catch (err) {
    console.error("SUPPLIER ERROR 👉", err);
    res.status(500).json({ message: err.message });
  }
};

export const getSuppliers = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT * FROM suppliers ORDER BY supplierCode ASC`
    );

    res.status(200).json(rows);
  } catch (err) {
    console.error("SUPPLIER ERROR 👉", err);
    res.status(500).json({ message: err.message });
  }
};

export const getSupplierById = async (req, res) => {
  try {
    const [rows] = await db.query(`SELECT * FROM suppliers WHERE id = ?`, [
      req.params.id,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    res.status(200).json(rows[0]);
  } catch (err) {
    console.error("SUPPLIER ERROR 👉", err);
    res.status(500).json({ message: err.message });
  }
};
