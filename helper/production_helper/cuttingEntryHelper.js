import CuttingEntry from "../../models/production_model/CuttingEntry.js";

/* ================= CREATE ================= */
export const createCuttingEntry = async (req, res) => {
  const entry = await CuttingEntry.create(req.body);
  res.status(201).json(entry);
};

/* ================= READ (GROUPED) ================= */
export const getCuttingSummary = async (req, res) => {
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
        returnQtyList: { $push: "$summary.returnQty" },
      },
    },
    { $sort: { createdAt: -1 } },
  ]);

  res.json(data);
};

/* ================= READ BY ID ================= */
export const getCuttingById = async (req, res) => {
  const entry = await CuttingEntry.findById(req.params.id);
  if (!entry) return res.status(404).json({ message: "Not found" });
  res.json(entry);
};

/* ================= UPDATE ================= */
export const updateCutting = async (req, res) => {
  const updated = await CuttingEntry.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
};

/* ================= DELETE ================= */
export const deleteCutting = async (req, res) => {
  await CuttingEntry.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted successfully" });
};

/* ================= ORDER WISE ENTRIES ================= */
export const getCuttingByOrder = async (req, res) => {
  const entries = await CuttingEntry.find({ orderId: req.params.orderId });
  res.json(entries);
};

/* ================= BUNDLES (STITCHING ISSUE) ================= */
export const getBundlesByOrder = async (req, res) => {
  const entries = await CuttingEntry.find({ orderId: req.params.orderId });

  if (!entries.length) {
    return res.status(404).json({ message: "No cutting entries found" });
  }

  const bundles = [];

  entries.forEach((entry) => {
    entry.items.forEach((item) => {
      item.bundles.forEach((bundle) => {
        bundles.push({
          cuttingEntryId: entry._id,
          bundleNo: bundle.bundleNo,
          itemName: bundle.itemName,
          size: bundle.size,
          pcs: bundle.pcs,
          school: item.school,
          cost: item.cuttingRate,
          priority: item.priority,
        });
      });
    });
  });

  res.json(bundles);
};

export const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);
