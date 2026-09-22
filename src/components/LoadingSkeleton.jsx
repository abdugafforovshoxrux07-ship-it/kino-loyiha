/**
 * Skeleton placeholder for a single movie card, used while data is loading.
 */
export function CardSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl bg-card-light shadow-card dark:bg-card-dark">
      <div className="shimmer-bg aspect-[2/3] w-full animate-shimmer" />
      <div className="space-y-2 p-3">
        <div className="shimmer-bg h-4 w-3/4 animate-shimmer rounded" />
        <div className="shimmer-bg h-3 w-1/2 animate-shimmer rounded" />
      </div>
    </div>
  )
}

/**
 * Grid of card skeletons — drop-in replacement for MovieGrid while loading.
 */
export default function LoadingSkeleton({ count = 10 }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  )
}
