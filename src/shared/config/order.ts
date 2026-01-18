export type OrderType = "buy" | "sell";

export const ORDER_TYPES: OrderType[] = ["buy", "sell"];

export const DEFAULT_ORDER_TYPE: OrderType = "buy";

export const validateOrderType = (value: string | null): OrderType | null => {
  if (value && ORDER_TYPES.includes(value as OrderType)) {
    return value as OrderType;
  }
  return null;
};
