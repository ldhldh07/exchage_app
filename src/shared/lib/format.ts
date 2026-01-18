export const formatRate = (value: number) => {
  return value.toLocaleString("ko-KR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const formatPercentage = (value: number) => {
  const prefix = value >= 0 ? "+" : "";
  return `${prefix}${value.toFixed(1)}%`;
};

export const formatBalance = (value: number, isKRW: boolean = false) => {
  if (isKRW) {
    return value.toLocaleString("ko-KR");
  }
  return value.toLocaleString("ko-KR", {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  });
};
