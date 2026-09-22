export default function ErrorState({
  title = 'Something went wrong',
  message = 'We couldn’t load this content. Please try again.',
  onRetry,
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-red-200 bg-red-50 px-6 py-16 text-center dark:border-red-900/40 dark:bg-red-950/20">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-2xl dark:bg-red-900/40">
        ⚠️
      </div>
      <h3 className="font-display text-lg font-semibold text-red-600 dark:text-red-400">{title}</h3>
      <p className="max-w-sm text-sm text-red-500/80 dark:text-red-400/70">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-2 rounded-full bg-red-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-red-700 active:scale-95"
        >
          Try Again
        </button>
      )}
    </div>
  )
}
