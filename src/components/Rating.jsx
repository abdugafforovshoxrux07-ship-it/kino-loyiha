import { formatRating } from '../utils/format.js'

/**
 * Circular rating badge showing a movie's vote average out of 10.
 */
export default function Rating({ value = 0, size = 'md' }) {
  const pct = Math.round((value / 10) * 100)
  const color =
    pct >= 70 ? 'text-green-400 border-green-400' : pct >= 40 ? 'text-yellow-400 border-yellow-400' : 'text-red-400 border-red-400'

  const dims = size === 'sm' ? 'w-9 h-9 text-[11px]' : size === 'lg' ? 'w-16 h-16 text-lg' : 'w-11 h-11 text-xs'

  return (
    <div
      className={`relative flex items-center justify-center rounded-full border-2 bg-slate-900/80 font-bold backdrop-blur-sm ${dims} ${color}`}
      title={`${formatRating(value)} / 10`}
    >
      {formatRating(value)}
    </div>
  )
}
