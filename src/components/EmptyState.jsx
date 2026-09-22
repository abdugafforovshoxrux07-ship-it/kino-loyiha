export default function EmptyState({
  title = 'Nothing here yet',
  message = 'Try adjusting your search or check back later.',
  icon = null,
  action = null,
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-slate-300 bg-white/50 px-6 py-16 text-center dark:border-slate-700 dark:bg-white/[0.02]">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-2xl dark:bg-slate-800">
        {icon || '🎬'}
      </div>
      <h3 className="font-display text-lg font-semibold text-slate-800 dark:text-slate-100">{title}</h3>
      <p className="max-w-sm text-sm text-slate-500 dark:text-slate-400">{message}</p>
      {action}
    </div>
  )
}
