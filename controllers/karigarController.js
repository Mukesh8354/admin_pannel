import db from "../config/mysql.js";
import {
  extractKarigarDocuments,
  updateKarigarDocuments,
  deleteKarigarDocuments,
} from "../helper/karigarHelper/karigarHelper.js";

import { validateKarigar } from "../helper/karigarHelper/karigarValidationHelper.js";

/* ================= CREATE ================= */
export const createKarigar = async (req, res) => {
  const { isValid, errors } = await validateKarigar({
    body: req.body,
    files: req.files,
  });

  if (!isValid) {
    return res.status(400).json({
      message: "Validation failed",
      errors,
    });
  }
  try {
    const docs = extractKarigarDocuments(req.files);

    const [result] = await db.query(
      `INSERT INTO karigars
      (karigar_name, contact_no, current_address, permanent_address,
       id_proof, address_proof, electricity_bill, other_document, photo)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        req.body.karigarName,
        req.body.contactNo,
        req.body.currentAddress,
        req.body.permanentAddress,
        docs.idProof,
        docs.addressProof,
        docs.electricityBill,
        docs.otherDocument,
        docs.photo,
      ]
    );

    res.status(201).json({ id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

/* ================= GET ALL ================= */
export const getKarigars = async (req, res) => {
  try {
    const [rows] = await db.query(`
    SELECT
      id,
      karigar_name        AS karigarName,
      contact_no          AS contactNo,
      current_address     AS currentAddress,
      permanent_address   AS permanentAddress,
      id_proof            AS idProof,
      address_proof       AS addressProof,
      electricity_bill    AS electricityBill,
      other_document      AS otherDocument,
      photo,
      created_at          AS createdAt
    FROM karigars
    ORDER BY id DESC
  `);

    res.json(rows);
  } catch (err) {
    console.error("GET KARIGARS ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

/* ================= GET ONE ================= */
export const getKarigar = async (req, res) => {
  try {
    const [rows] = await db.query(
      `
    SELECT
      id,
      karigar_name AS karigarName,
      contact_no AS contactNo,
      current_address AS currentAddress,
      permanent_address AS permanentAddress,
      id_proof AS idProof,
      address_proof AS addressProof,
      electricity_bill AS electricityBill,
      other_document AS otherDocument,
      photo,
      created_at AS createdAt
    FROM karigars
    WHERE id = ?
    `,
      [req.params.id]
    );

    if (!rows.length) return res.status(404).json({ message: "Not found" });
    res.json(rows[0]);
  } catch (err) {
    console.error("GET KARIGAR ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

/* ================= UPDATE ================= */
export const updateKarigar = async (req, res) => {
  const { isValid, errors } = await validateKarigar({
    body: req.body,
    files: req.files,
    karigarId: req.params.id, // 👈 important
  });

  if (!isValid) {
    return res.status(400).json({
      message: "Validation failed",
      errors,
    });
  }
  const [rows] = await db.query("SELECT * FROM karigars WHERE id = ?", [
    req.params.id,
  ]);
  if (!rows.length) return res.status(404).json({ message: "Not found" });

  const docs = updateKarigarDocuments(
    {
      idProof: rows[0].id_proof,
      addressProof: rows[0].address_proof,
      electricityBill: rows[0].electricity_bill,
      otherDocument: rows[0].other_document,
      photo: rows[0].photo,
    },
    req.files
  );

  await db.query(
    `UPDATE karigars SET
      karigar_name = ?,
      contact_no = ?,
      current_address = ?,
      permanent_address = ?,
      id_proof = ?,
      address_proof = ?,
      electricity_bill = ?,
      other_document = ?,
      photo = ?
     WHERE id = ?`,
    [
      req.body.karigarName,
      req.body.contactNo,
      req.body.currentAddress,
      req.body.permanentAddress,
      docs.idProof,
      docs.addressProof,
      docs.electricityBill,
      docs.otherDocument,
      docs.photo,
      req.params.id,
    ]
  );

  res.json({ message: "Updated successfully" });
};

/* ================= DELETE ================= */
export const deleteKarigar = async (req, res) => {
  const [rows] = await db.query("SELECT * FROM karigars WHERE id = ?", [
    req.params.id,
  ]);
  if (!rows.length) return res.status(404).json({ message: "Not found" });

  deleteKarigarDocuments({
    idProof: rows[0].id_proof,
    addressProof: rows[0].address_proof,
    electricityBill: rows[0].electricity_bill,
    otherDocument: rows[0].other_document,
    photo: rows[0].photo,
  });

  await db.query("DELETE FROM karigars WHERE id = ?", [req.params.id]);
  res.json({ message: "Deleted successfully" });
};
