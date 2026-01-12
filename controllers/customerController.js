import {
  validateCustomer,
  isCustomerNameExists,
  generateCustomerCode,
  insertCustomer,
  fetchCustomers,
  fetchCustomerById,
  updateCustomerById,
  deleteCustomerById,
} from "../helper/customerHelper/customerHelper.js";

/* ================= CREATE ================= */
export const createCustomer = async (req, res) => {
  if (req.body.gstin === "") req.body.gstin = null;
  if (req.body.address2 === "") req.body.address2 = null;
  if (req.body.remarks === "") req.body.remarks = null;
  try {
    const error = validateCustomer(req.body);
    if (error) return res.status(400).json({ message: error });

    if (await isCustomerNameExists(req.body.customerName))
      return res.status(400).json({ message: "Customer already exists" });

    const customerCode = await generateCustomerCode();

    const id = await insertCustomer({
      customerCode,
      ...req.body,
    });

    res.status(201).json({ id, customerCode, ...req.body });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= READ ================= */
export const getCustomers = async (req, res) => {
  const customers = await fetchCustomers();
  res.json(customers);
};

export const getCustomerById = async (req, res) => {
  const customer = await fetchCustomerById(req.params.id);
  if (!customer) return res.status(404).json({ message: "Customer not found" });

  res.json(customer);
};

/* ================= UPDATE ================= */
export const updateCustomer = async (req, res) => {
  const error = validateCustomer(req.body);
  if (error) return res.status(400).json({ message: error });

  if (await isCustomerNameExists(req.body.customerName, req.params.id))
    return res.status(400).json({ message: "Customer already exists" });

  const updated = await updateCustomerById(req.params.id, req.body);
  if (!updated) return res.status(404).json({ message: "Customer not found" });

  res.json({ message: "Customer updated successfully" });
};

/* ================= DELETE ================= */
export const deleteCustomer = async (req, res) => {
  const deleted = await deleteCustomerById(req.params.id);
  if (!deleted) return res.status(404).json({ message: "Customer not found" });

  res.json({ message: "Customer deleted successfully" });
};
