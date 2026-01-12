// helpers/customerHelper.js
import db from "../../config/mysql.js";

/* ================= VALIDATION ================= */
export const validateCustomer = (data) => {
  const { customerName, contactNo, address1, state, stateCode, gstin } = data;

  if (!customerName || customerName.trim().length < 3)
    return "Customer name is invalid";

  if (!/^\d{10}$/.test(contactNo)) return "Invalid contact number";

  if (!address1) return "Address line 1 required";

  if (!state || !stateCode) return "State and state code are required";

  if (
    gstin &&
    !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(gstin)
  )
    return "Invalid GSTIN";

  return null;
};

/* ================= CREATE HELPERS ================= */

// 🔍 duplicate customer name
export const isCustomerNameExists = async (customerName, excludeId = null) => {
  let sql = `SELECT id FROM customers WHERE LOWER(customer_name)=LOWER(?)`;
  const params = [customerName];

  if (excludeId) {
    sql += ` AND id != ?`;
    params.push(excludeId);
  }

  const [rows] = await db.query(sql, params);
  return rows.length > 0;
};

// 🔢 auto customer code
export const generateCustomerCode = async () => {
  const [rows] = await db.query(
    `SELECT customer_code FROM customers ORDER BY customer_code DESC LIMIT 1`
  );

  return rows.length ? rows[0].customer_code + 1 : 1;
};

// ➕ insert
export const insertCustomer = async (data) => {
  const sql = `
    INSERT INTO customers
    (customer_code, customer_name, contact_no, address1, address2,
     state, state_code, country, gstin, remarks)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    data.customerCode ?? null,
    data.customerName,
    data.contactNo,
    data.address1,
    data.address2 || null,
    data.state,
    data.stateCode,
    data.country || "India",
    data.gstin && data.gstin.trim() !== "" ? data.gstin : null,
    data.remarks || null,
  ];

  const [result] = await db.query(sql, values);
  return result.insertId;
};

/* ================= READ HELPERS ================= */

export const fetchCustomers = async () => {
  const [rows] = await db.query(`
    SELECT
      id,
      customer_code AS customerCode,
      customer_name AS customerName,
      contact_no AS contactNo,
      address1,
      address2,
      state,
      state_code AS stateCode,
      country,
      gstin,
      remarks
    FROM customers
    ORDER BY created_at DESC
  `);

  return rows;
};

export const fetchCustomerById = async (id) => {
  const [rows] = await db.query(`SELECT * FROM customers WHERE id = ?`, [id]);
  return rows[0];
};

/* ================= UPDATE ================= */

export const updateCustomerById = async (id, data) => {
  const sql = `
    UPDATE customers SET
      customer_name=?,
      contact_no=?,
      address1=?,
      address2=?,
      state=?,
      state_code=?,
      country=?,
      gstin=?,
      remarks=?
    WHERE id=?
  `;

  const values = [
    data.customerName,
    data.contactNo,
    data.address1,
    data.address2,
    data.state,
    data.stateCode,
    data.country,
    data.gstin,
    data.remarks,
    id,
  ];

  const [result] = await db.query(sql, values);
  return result.affectedRows;
};

/* ================= DELETE ================= */

export const deleteCustomerById = async (id) => {
  const [result] = await db.query(`DELETE FROM customers WHERE id=?`, [id]);
  return result.affectedRows;
};
