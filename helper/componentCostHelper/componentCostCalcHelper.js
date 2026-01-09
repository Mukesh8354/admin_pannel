// helper/componentCostHelper/componentCostCalcHelper.js

export const calculateTotalCost = (r = {}) => {
  return (
    (r.basic || 0) +
    (r.label || 0) +
    (r.piping || 0) +
    (r.longpiping || 0) +
    (r.shoulder || 0) +
    (r.pocket || 0) +
    (r.flap || 0) +
    (r.fashion || 0) +
    (r.gallis || 0) +
    (r.extra || 0) +
    (r.baju || 0) +
    (r.waist || 0) +
    (r.ot1 || 0) +
    (r.ot2 || 0) +
    (r.ot3 || 0) +
    (r.ot4 || 0) +
    (r.ot5 || 0)
  );
};
