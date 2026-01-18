import { LoadingSpinner } from "./LoadingSpinner";

interface LoaderProps {
  className?: string;
}

export function Loader({ className = "py-8" }: Readonly<LoaderProps>) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <LoadingSpinner />
    </div>
  );
}
