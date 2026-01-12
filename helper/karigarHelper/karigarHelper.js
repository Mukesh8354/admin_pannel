import fs from "fs";

/**
 * Extract documents from req.files
 */
export const extractKarigarDocuments = (files = {}) => {
  return {
    idProof: files?.idProof?.[0]?.filename || null,
    addressProof: files?.addressProof?.[0]?.filename || null,
    electricityBill: files?.electricityBill?.[0]?.filename || null,
    otherDocument: files?.otherDocument?.[0]?.filename || null,
    photo: files?.photo?.[0]?.filename || null,
  };
};

/**
 * Update only uploaded documents
 */
export const updateKarigarDocuments = (existingDocs = {}, files = {}) => {
  const updatedDocs = { ...existingDocs };

  Object.keys(files).forEach((key) => {
    if (files[key]?.[0]?.filename) {
      updatedDocs[key] = files[key][0].filename;
    }
  });

  return updatedDocs;
};

/**
 * Delete karigar documents from storage
 */
export const deleteKarigarDocuments = (documents = {}) => {
  Object.values(documents).forEach((file) => {
    if (file) {
      fs.unlink(`uploads/karigar/${file}`, () => {});
    }
  });
};
