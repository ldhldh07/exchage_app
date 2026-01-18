import type { SVGProps } from "react";

interface ChevronDownIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

export function ChevronDownIcon({ size = 20, className, ...props }: Readonly<ChevronDownIconProps>) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="-4 -4 32 32"
      fill="none"
      stroke="currentColor"
      className={className}
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}
