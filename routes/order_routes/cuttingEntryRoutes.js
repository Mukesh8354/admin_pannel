import express from "express";
import CuttingEntry from "../../models/production_model/CuttingEntry.js";

const router = express.Router();

// ✅ CREATE Cutting Entry
router.post("/", async (req, res) => {
  try {
    const entry = new CuttingEntry(req.body);
    await entry.save();
    res.status(201).json(entry);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ READ ALL Cutting Entries
// router.get("/", async (req, res) => {
//   try {
//     const list = await CuttingEntry.find().sort({ createdAt: -1 });
//     res.json(list);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

router.get("/", async (req, res) => {
  const data = await CuttingEntry.aggregate([
    {
      $group: {
        _id: "$orderId",

        customerName: { $first: "$customerName" },
        poNo: { $first: "$poNo" },
        poDate: { $first: "$poDate" },
        karigar: { $first: "$karigar" },
        narration: { $first: "$narration" },
        createdAt: { $max: "$createdAt" },

        orderQty: { $first: "$summary.orderQty" },

        // 🔥 yahin magic
        returnQtyList: { $push: "$summary.returnQty" },
      },
    },
    { $sort: { createdAt: -1 } },
  ]);

  res.json(data);
});

// ✅ READ SINGLE Cutting Entry
router.get("/:id", async (req, res) => {
  try {
    const entry = await CuttingEntry.findById(req.params.id);
    if (!entry) {
      return res.status(404).json({ message: "Cutting Entry not found" });
    }
    res.json(entry);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ UPDATE Cutting Entry
router.put("/:id", async (req, res) => {
  try {
    const updated = await CuttingEntry.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ DELETE Cutting Entry
router.delete("/:id", async (req, res) => {
  try {
    await CuttingEntry.findByIdAndDelete(req.params.id);
    res.json({ message: "Cutting Entry deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET previous cutting entries by order
router.get("/order/:orderId", async (req, res) => {
  const entries = await CuttingEntry.find({
    orderId: req.params.orderId,
  });

  res.json(entries); // ✅ FULL ENTRIES WITH items[]
});

// router.get("/order/:orderId", async (req, res) => {
//   try {
//     const { orderId } = req.params;

//     const entries = await CuttingEntry.find({ order: orderId });

//     // 🔥 total returnQty of previous entries
//     const totalReturnedQty = entries.reduce(
//       (sum, entry) => sum + Number(entry.summary?.returnQty || 0),
//       0
//     );

//     res.json({
//       orderId,
//       totalReturnedQty,
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

export default router;
