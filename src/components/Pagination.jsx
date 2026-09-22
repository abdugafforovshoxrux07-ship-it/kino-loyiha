/**
 * Simple, accessible pagination control with prev/next and a page window.
 */
export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (!totalPages || totalPages <= 1) return null

  const maxPages = Math.min(totalPages, 500) // TMDB caps at 500 pages
  const windowSize = 5
  let start = Math.max(1, currentPage - Math.floor(windowSize / 2))
  const end = Math.min(maxPages, start + windowSize - 1)
  start = Math.max(1, end - windowSize + 1)
  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i)

  const goTo = (page) => {
    if (page < 1 || page > maxPages || page === currentPage) return
    onPageChange(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const baseBtn =
    'flex h-9 min-w-9 items-center justify-center rounded-lg px-3 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-40'

  return (
    <nav className="mt-8 flex flex-wrap items-center justify-center gap-2" aria-label="Pagination">
      <button
        type="button"
        onClick={() => goTo(currentPage - 1)}
        disabled={currentPage <= 1}
        className={`${baseBtn} bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700`}
      >
        Prev
      </button>

      {start > 1 && (
        <>
          <button type="button" onClick={() => goTo(1)} className={`${baseBtn} bg-slate-100 dark:bg-slate-800`}>
            1
          </button>
          {start > 2 && <span className="px-1 text-slate-400">…</span>}
        </>
      )}

      {pages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => goTo(page)}
          aria-current={page === currentPage ? 'page' : undefined}
          className={`${baseBtn} ${
            page === currentPage
              ? 'bg-primary-600 text-white shadow-glow'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          {page}
        </button>
      ))}

      {end < maxPages && (
        <>
          {end < maxPages - 1 && <span className="px-1 text-slate-400">…</span>}
          <button
            type="button"
            onClick={() => goTo(maxPages)}
            className={`${baseBtn} bg-slate-100 dark:bg-slate-800`}
          >
            {maxPages}
          </button>
        </>
      )}

      <button
        type="button"
        onClick={() => goTo(currentPage + 1)}
        disabled={currentPage >= maxPages}
        className={`${baseBtn} bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700`}
      >
        Next
      </button>
    </nav>
  )
}
