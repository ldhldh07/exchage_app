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

export const formatForex = (value: number) => {
  return value.toLocaleString("ko-KR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const formatDateTime = (dateStr: string) => {
  const date = new Date(dateStr);
  const pad = (n: number) => n.toString().padStart(2, "0");
  
  const yyyy = date.getFullYear();
  const mm = pad(date.getMonth() + 1);
  const dd = pad(date.getDate());
  const hh = pad(date.getHours());
  const min = pad(date.getMinutes());
  const ss = pad(date.getSeconds());
  
  return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
};
