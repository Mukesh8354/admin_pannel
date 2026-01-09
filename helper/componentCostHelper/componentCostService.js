// helper/componentCostHelper/componentCostService.js

import ComponentCost from "../../models/ComponentCost.js";

export const insertComponentCostsDB = async (docs) => {
  return await ComponentCost.insertMany(docs);
};

export const getComponentCostsDB = async () => {
  return await ComponentCost.find().sort({ createdAt: -1 });
};
