// helper/rawMaterialHelper/rawMaterialService.js
import {
  createRawMaterialDB,
  getRawMaterialsDB,
} from "./rawMaterialDbHelper.js";

import { normalize, validateRawMaterial } from "./rawMaterialValidation.js";

export const createRawMaterialService = async (body, file) => {
  const error = validateRawMaterial(body);
  if (error) return { error };

  const payload = {
    category: normalize(body.category),
    itemName: normalize(body.itemName),
    designNo: normalize(body.designNo),
    hsnCode: normalize(body.hsnCode),
    unit: normalize(body.unit),
    gst: body.gst,
    size: normalize(body.size),
    schoolColor: normalize(body.schoolColor),
    purchaseRate: body.purchaseRate,
    openingStock: body.openingStock,
    minimumStock: body.minimumStock,
    maximumStock: body.maximumStock,
    remarks: normalize(body.remarks),
    image: file ? file.filename : null,
  };

  const saved = await createRawMaterialDB(payload);
  return { data: saved };
};

export const getRawMaterialsService = async () => {
  return await getRawMaterialsDB();
};
