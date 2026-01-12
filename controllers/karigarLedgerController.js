import db from "../config/mysql.js";
import {
  validateAdvancePayment,
  getKarigarById,
  calculateAdvanceBalance,
  createAdvanceLedger,
} from "../helper/karigarLedger/karigarLedgerHelper.js";

export const addAdvancePayment = async (req, res) => {
  try {
    const { karigarId, advanceAmount, description, date } = req.body;

    // ✅ validation
    const error = validateAdvancePayment({ karigarId, advanceAmount });
    if (error) {
      return res.status(400).json({ message: error });
    }

    // ✅ get karigar
    const karigar = await getKarigarById(karigarId);

    // ✅ calculate new balance
    const newBalance = calculateAdvanceBalance(
      karigar.balance_amount,
      advanceAmount
    );

    // ✅ update karigar balance
    await db.query("UPDATE karigars SET balance_amount = ? WHERE id = ?", [
      newBalance,
      karigarId,
    ]);

    // ✅ insert ledger
    const ledgerId = await createAdvanceLedger({
      karigarId,
      advanceAmount,
      description,
      newBalance,
      date,
    });

    res.status(201).json({
      message: "Advance payment added",
      balanceAmount: newBalance,
      ledgerId,
    });
  } catch (err) {
    console.error("ADVANCE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

/* ================= GET LEDGER ================= */
export const getLedgerList = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT
        kl.id,
        kl.karigar_id,
        k.karigar_name AS karigarName,
        kl.description,
        kl.credit AS amount,
        kl.entry_date AS date
      FROM karigar_ledgers kl
      LEFT JOIN karigars k ON k.id = kl.karigar_id
      ORDER BY kl.created_at DESC
    `);

    res.json(rows);
  } catch (err) {
    console.error("LEDGER LIST ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};
