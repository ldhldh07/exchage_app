export const formatRate = (value: number) => {
  return value.toLocaleString("ko-KR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const formatPercentage = (value: number) => {
  const absValue = Math.abs(value);
  return `${absValue.toFixed(2)}%`;
};

export const formatBalance = (value: number) => {
  return value.toLocaleString("ko-KR", {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  });
};

export const formatKrw = (value: number) => {
  return value.toLocaleString("ko-KR");
};
