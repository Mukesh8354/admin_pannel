import db from "../../config/mysql.js";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB
const ALLOWED_FILES = [
  "idProof",
  "addressProof",
  "electricityBill",
  "otherDocument",
  "photo",
];

/**
 * Validate Karigar Create / Update
 */
export const validateKarigar = async ({
  body = {},
  files = {},
  karigarId = null, // update ke time use hoga
}) => {
  const errors = {};

  if (!body.karigarName || body.karigarName.trim() === "") {
    errors.karigarName = "Karigar name is required";
  }

  if (!body.contactNo || body.contactNo.trim() === "") {
    errors.contactNo = "Contact number is required";
  }

  if (!body.currentAddress || body.currentAddress.trim() === "") {
    errors.currentAddress = "Current address is required";
  }

  if (!body.permanentAddress || body.permanentAddress.trim() === "") {
    errors.permanentAddress = "Permanent address is required";
  }

  /* ================= CONTACT NUMBER (ONLY DIGITS) ================= */
  if (body.contactNo && !/^\d+$/.test(body.contactNo)) {
    errors.contactNo = "Contact number must contain only digits";
  }

  /* ================= DUPLICATE KARIGAR NAME ================= */
  if (body.karigarName) {
    const [rows] = await db.query(
      `
      SELECT id FROM karigars 
      WHERE karigar_name = ?
      ${karigarId ? "AND id != ?" : ""}
      `,
      karigarId ? [body.karigarName, karigarId] : [body.karigarName]
    );

    if (rows.length > 0) {
      errors.karigarName = "Karigar name already exists";
    }
  }

  Object.keys(files || {}).forEach((key) => {
    if (!ALLOWED_FILES.includes(key)) return;

    files[key].forEach((file) => {
      if (file.size > MAX_FILE_SIZE) {
        errors[key] = `${key} size must be less than 2 MB`;
      }
    });
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
