type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

export function Skeleton({ className = "", ...props }: Readonly<SkeletonProps>) {
  return <div className={`animate-pulse bg-gray-200 rounded ${className}`} {...props} />;
}
