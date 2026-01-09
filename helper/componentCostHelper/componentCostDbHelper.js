// helper/componentCostHelper/componentCostDbHelper.js

import ComponentCost from "../../models/ComponentCost.js";

export const checkComponentCostExists = async ({ category, school, size }) => {
  return await ComponentCost.findOne({
    category,
    school,
    size,
  });
};
