// helpers/purchaseHelper.js

/* ================= VALIDATION ================= */
export const validatePurchase = (data) => {
  const { supplierId, purchaseDate, items } = data;

  if (!supplierId) return "supplierId required";
  if (!purchaseDate) return "purchaseDate required";
  if (!items || !Array.isArray(items) || items.length === 0)
    return "At least one item required";

  return null; // ✅ no error
};

/* ================= DUE DATE CALCULATION ================= */
export const calculateDueDate = ({ purchaseDate, creditDays, dueDate }) => {
  if (dueDate) return dueDate;

  if (purchaseDate && creditDays) {
    const d = new Date(purchaseDate);
    d.setDate(d.getDate() + Number(creditDays));
    return d.toISOString().split("T")[0];
  }

  return null;
};
