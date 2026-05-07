export const KG_TO_LB = 2.2046226218;

export const toKg = (value, unit) => (unit === "kg" ? value : value / KG_TO_LB);
export const fromKg = (valueKg, unit) => (unit === "kg" ? valueKg : valueKg * KG_TO_LB);
