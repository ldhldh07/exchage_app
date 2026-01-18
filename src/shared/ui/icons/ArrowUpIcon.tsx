interface ArrowUpIconProps {
  className?: string;
}

export function ArrowUpIcon({ className }: Readonly<ArrowUpIconProps>) {
  return (
    <svg
      width="12"
      height="8"
      viewBox="0 0 12 8"
      fill="currentColor"
      className={className}
    >
      <path d="M6 0L12 8H0L6 0Z" />
    </svg>
  );
}
