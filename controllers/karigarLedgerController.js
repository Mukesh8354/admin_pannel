// controllers/karigarLedgerController.js
import Karigar from "../models/Karigar.js";
import KarigarLedger from "../models/KarigarLedger.js";

export const addAdvancePayment = async (req, res) => {
  console.log("body", req.body);
  try {
    const { karigarId, advanceAmount, description, date } = req.body;

    if (!karigarId || !advanceAmount) {
      return res.status(400).json({
        message: "karigarId and advanceAmount are required",
      });
    }

    const karigar = await Karigar.findById(karigarId);

    if (!karigarId || advanceAmount === undefined) {
      return res.status(400).json({
        message: "karigarId and advanceAmount are required",
      });
    }

    const currentBalance = Number(karigar.balanceAmount || 0);
    const advance = Number(advanceAmount);

    console.log(currentBalance);

    if (isNaN(advance)) {
      return res.status(400).json({ message: "Invalid advance amount" });
    }

    const newBalance = currentBalance - advance;

    // update karigar balance
    karigar.balanceAmount = newBalance;
    await karigar.save();

    // ledger entry
    const ledger = await KarigarLedger.create({
      karigarId,
      description: description || "Advance Payment",
      credit: advance,
      debit: 0,
      balanceAfter: newBalance,
      date: date ? new Date(date) : new Date(),
    });

    res.status(201).json({
      message: "Advance payment added",
      balanceAmount: newBalance,
      ledger,
    });
  } catch (err) {
    console.error("ADVANCE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};
export const getLedgerList = async (req, res) => {
  try {
    const data = await KarigarLedger.find()
      .populate("karigarId", "karigarName")
      .sort({ createdAt: -1 });

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
