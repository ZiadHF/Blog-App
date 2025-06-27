interface LoadingSkeletonProps {
  className?: string;
  count?: number;
  style?: React.CSSProperties;
}

export function LoadingSkeleton({
  className,
  style,
  count = 1,
}: LoadingSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          style={style}
          className={`animate-pulse bg-primary/30 rounded-lg ${className}`}
        />
      ))}
    </>
  );
}

export function PostCardSkeleton() {
  return (
    <div className="space-y-4">
      <LoadingSkeleton className="h-48 w-full" />
      <div className="space-y-2">
        <LoadingSkeleton className="h-4 w-1/3" />
        <LoadingSkeleton className="h-6 w-full" />
        <LoadingSkeleton className="h-4 w-full" />
        <div className="flex gap-2">
          <LoadingSkeleton count={3} className="h-6 w-16" />
        </div>
      </div>
    </div>
  );
}

export function FeaturedPostSkeleton() {
  return (
    <div className="flex flex-col h-full">
      <LoadingSkeleton className="flex-1 w-full min-h-48" />
      <div className="space-y-2 mt-4 flex-shrink-0">
        <LoadingSkeleton className="h-4 w-1/3" />
        <LoadingSkeleton className="h-6 w-full" />
        <LoadingSkeleton className="h-4 w-full" />
        <div className="flex gap-2">
          <LoadingSkeleton count={3} className="h-6 w-16" />
        </div>
      </div>
    </div>
  );
}

export function ErrorMessage({
  error,
  onRetry,
}: {
  error: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="text-error text-center">
        <h3 className="text-xl font-semibold mb-2">Something went wrong</h3>
        <p className="text-primary/80 mb-4">{error}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-4 py-2 rounded-lg dark:bg-purple-300 bg-purple-600 text-purple-100 hover:bg-purple-600/80 dark:text-purple-900 hover:dark:bg-purple-300/80 cursor-pointer transition-colors"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}
