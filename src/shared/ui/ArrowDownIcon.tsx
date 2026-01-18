interface ArrowDownIconProps {
  className?: string;
}

export function ArrowDownIcon({ className }: Readonly<ArrowDownIconProps>) {
  return (
    <svg
      width="12"
      height="8"
      viewBox="0 0 12 8"
      fill="currentColor"
      className={className}
    >
      <path d="M6 8L0 0H12L6 8Z" />
    </svg>
  );
}
