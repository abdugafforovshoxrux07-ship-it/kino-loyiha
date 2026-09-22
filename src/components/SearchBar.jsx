import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

/**
 * Search input + button. Can be used standalone (navbar) or embedded
 * in the Search page. When `onSearch` is provided it's called directly;
 * otherwise it navigates to /search?q=...
 */
export default function SearchBar({ initialValue = '', onSearch, autoFocus = false, className = '' }) {
  const [value, setValue] = useState(initialValue)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = value.trim()
    if (!trimmed) return
    if (onSearch) {
      onSearch(trimmed)
    } else {
      navigate(`/search?q=${encodeURIComponent(trimmed)}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`flex w-full items-center gap-2 ${className}`}>
      <div className="relative flex-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
        >
          <circle cx="11" cy="11" r="7" />
          <path strokeLinecap="round" d="m21 21-4.3-4.3" />
        </svg>
        <input
          type="search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search for movies…"
          autoFocus={autoFocus}
          className="w-full rounded-full border border-slate-300 bg-white py-2.5 pl-9 pr-4 text-sm text-slate-800 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
        />
      </div>
      <button
        type="submit"
        className="rounded-full bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-700 active:scale-95"
      >
        Search
      </button>
    </form>
  )
}
