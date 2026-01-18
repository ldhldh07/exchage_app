import type { SVGProps } from "react";

interface ArrowDownLongIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

export function ArrowDownLongIcon({ size = 16, className, ...props }: Readonly<ArrowDownLongIconProps>) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      className={className}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 14l-7 7m0 0l-7-7m7 7V3"
      />
    </svg>
  );
}

export function CircleArrowDownIcon() {
  return (
    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
      <svg
        width={16}
        height={16}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        className="text-white"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  );
}
