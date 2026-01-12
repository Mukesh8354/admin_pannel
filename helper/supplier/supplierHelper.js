// helpers/supplierHelper.js
import db from "../../config/mysql.js";

/* ================= VALIDATION ================= */
export const validateSupplier = (data) => {
  const { supplierName, contactNo, gstin } = data;

  if (!supplierName || supplierName.trim().length < 3) {
    return "Supplier name is required and must be at least 3 characters";
  }

  if (contactNo && !/^\d{10}$/.test(contactNo)) {
    return "Contact number must be 10 digits";
  }

  if (gstin && gstin.trim() !== "" && gstin.length !== 15) {
    return "GSTIN must be 15 characters";
  }

  return null;
};

/* ================= DUPLICATE CHECK ================= */
export const isSupplierNameExists = async (supplierName) => {
  const [rows] = await db.query(
    `SELECT id FROM suppliers WHERE LOWER(supplierName) = LOWER(?) LIMIT 1`,
    [supplierName]
  );

  return rows.length > 0;
};

/* ================= AUTO SUPPLIER CODE ================= */
export const generateSupplierCode = async () => {
  const [rows] = await db.query(
    `SELECT MAX(supplierCode) AS maxCode FROM suppliers`
  );

  return rows[0].maxCode ? rows[0].maxCode + 1 : 1;
};
