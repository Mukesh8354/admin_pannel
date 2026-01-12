import db from "../../config/mysql.js";

export const validateAdvancePayment = ({ karigarId, advanceAmount }) => {
  if (!karigarId || advanceAmount === undefined) {
    return "karigarId and advanceAmount are required";
  }

  if (isNaN(Number(advanceAmount))) {
    return "Invalid advance amount";
  }

  return null;
};

export const getKarigarById = async (karigarId) => {
  const [rows] = await db.query(
    "SELECT id, balance_amount FROM karigars WHERE id = ?",
    [karigarId]
  );

  if (!rows.length) {
    throw new Error("Karigar not found");
  }

  return rows[0];
};

export const calculateAdvanceBalance = (currentBalance, advanceAmount) => {
  return Number(currentBalance || 0) - Number(advanceAmount);
};

export const createAdvanceLedger = async ({
  karigarId,
  advanceAmount,
  description,
  newBalance,
  date,
}) => {
  const [result] = await db.query(
    `INSERT INTO karigar_ledgers
     (karigar_id, description, credit, debit, balance_after, entry_date)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      karigarId,
      description || "Advance Payment",
      advanceAmount,
      0,
      newBalance,
      date ? date : new Date(),
    ]
  );

  return result.insertId;
};
