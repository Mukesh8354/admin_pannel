import Karigar from "../models/Karigar.js";
import fs from "fs";

// CREATE
export const createKarigar = async (req, res) => {
  try {
    const k = await Karigar.create({
      ...req.body,
      documents: {
        idProof: req.files?.idProof?.[0]?.filename,
        addressProof: req.files?.addressProof?.[0]?.filename,
        electricityBill: req.files?.electricityBill?.[0]?.filename,
        otherDocument: req.files?.otherDocument?.[0]?.filename,
        photo: req.files?.photo?.[0]?.filename,
      },
    });

    res.status(201).json(k);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL
export const getKarigars = async (req, res) => {
  const data = await Karigar.find().sort({ createdAt: -1 });
  res.json(data);
};

// GET ONE
export const getKarigar = async (req, res) => {
  const data = await Karigar.findById(req.params.id);
  res.json(data);
};

// UPDATE
export const updateKarigar = async (req, res) => {
  const karigar = await Karigar.findById(req.params.id);

  if (!karigar) return res.status(404).json({ message: "Not found" });

  karigar.karigarName = req.body.karigarName;
  karigar.contactNo = req.body.contactNo;
  karigar.currentAddress = req.body.currentAddress;
  karigar.permanentAddress = req.body.permanentAddress;

  Object.keys(req.files || {}).forEach((key) => {
    karigar.documents[key] = req.files[key][0].filename;
  });

  await karigar.save();
  res.json(karigar);
};

// DELETE
export const deleteKarigar = async (req, res) => {
  const karigar = await Karigar.findById(req.params.id);

  if (!karigar) return res.status(404).json({ message: "Not found" });

  Object.values(karigar.documents || {}).forEach((file) => {
    if (file) fs.unlink(`uploads/karigar/${file}`, () => {});
  });

  await karigar.deleteOne();
  res.json({ message: "Deleted successfully" });
};
