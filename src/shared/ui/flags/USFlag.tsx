interface USFlagProps {
  size?: number;
  className?: string;
}

export function USFlag({ size = 40, className }: Readonly<USFlagProps>) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
    >
      <defs>
        <clipPath id="circleClip">
          <circle cx="50" cy="50" r="50" />
        </clipPath>
      </defs>
      
      <g clipPath="url(#circleClip)">
        {/* 흰색 배경 */}
        <rect x="0" y="0" width="100" height="100" fill="white" />
        
        {/* 빨간 줄무늬 4개 */}
        <rect x="0" y="0" width="100" height="14.3" fill="#B22234" />
        <rect x="0" y="28.6" width="100" height="14.3" fill="#B22234" />
        <rect x="0" y="57.2" width="100" height="14.3" fill="#B22234" />
        <rect x="0" y="85.8" width="100" height="14.3" fill="#B22234" />
        
        {/* 파란 사각형 */}
        <rect x="0" y="0" width="45" height="57" fill="#3C3B6E" />
        
        {/* 별들 */}
        <g fill="white">
          {/* 1행 */}
          <polygon points="7,8 8.5,12.5 13,12.5 9.5,15.5 11,20 7,17 3,20 4.5,15.5 1,12.5 5.5,12.5" />
          <polygon points="22,8 23.5,12.5 28,12.5 24.5,15.5 26,20 22,17 18,20 19.5,15.5 16,12.5 20.5,12.5" />
          <polygon points="37,8 38.5,12.5 43,12.5 39.5,15.5 41,20 37,17 33,20 34.5,15.5 31,12.5 35.5,12.5" />
          
          {/* 2행 */}
          <polygon points="14.5,22 16,26.5 20.5,26.5 17,29.5 18.5,34 14.5,31 10.5,34 12,29.5 8.5,26.5 13,26.5" />
          <polygon points="29.5,22 31,26.5 35.5,26.5 32,29.5 33.5,34 29.5,31 25.5,34 27,29.5 23.5,26.5 28,26.5" />
          
          {/* 3행 */}
          <polygon points="7,36 8.5,40.5 13,40.5 9.5,43.5 11,48 7,45 3,48 4.5,43.5 1,40.5 5.5,40.5" />
          <polygon points="22,36 23.5,40.5 28,40.5 24.5,43.5 26,48 22,45 18,48 19.5,43.5 16,40.5 20.5,40.5" />
          <polygon points="37,36 38.5,40.5 43,40.5 39.5,43.5 41,48 37,45 33,48 34.5,43.5 31,40.5 35.5,40.5" />
        </g>
      </g>
    </svg>
  );
}
