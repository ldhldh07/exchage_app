interface JPFlagProps {
  size?: number;
  className?: string;
}

export function JPFlag({ size = 40, className }: Readonly<JPFlagProps>) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
    >
      <defs>
        <clipPath id="circleClipJP">
          <circle cx="50" cy="50" r="50" />
        </clipPath>
      </defs>
      
      <g clipPath="url(#circleClipJP)">
        {/* 흰색 배경 */}
        <rect x="0" y="0" width="100" height="100" fill="white" />
        
        {/* 빨간 원 */}
        <circle cx="50" cy="50" r="25" fill="#BC002D" />
      </g>
    </svg>
  );
}
