import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import ThemeToggle from './ThemeToggle.jsx'
import { NAV_LINKS } from '../utils/constants.js'
import { useFavoritesStore } from '../stores/useFavoritesStore.js'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const favoritesCount = useFavoritesStore((s) => s.favorites.length)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [])

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    const trimmed = query.trim()
    if (!trimmed) return
    navigate(`/search?q=${encodeURIComponent(trimmed)}`)
    setQuery('')
    setMobileOpen(false)
  }

  const linkClass = ({ isActive }) =>
    `relative px-1 py-2 text-sm font-medium transition-colors ${
      isActive
        ? 'text-primary-500'
        : 'text-slate-600 hover:text-primary-500 dark:text-slate-300 dark:hover:text-primary-400'
    }`

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 shadow-sm backdrop-blur-md dark:bg-surface-dark/90'
          : 'bg-white/70 backdrop-blur-sm dark:bg-surface-dark/60'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex shrink-0 items-center gap-2 font-display text-xl font-extrabold">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-glow">
            🎬
          </span>
          <span className="hidden sm:inline">
            Cine<span className="text-gradient">Scope</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.path} to={link.path} className={linkClass}>
              {link.label}
              {link.label === 'Favorites' && favoritesCount > 0 && (
                <span className="ml-1 rounded-full bg-primary-600 px-1.5 py-0.5 text-[10px] font-bold text-white">
                  {favoritesCount}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <form onSubmit={handleSearchSubmit} className="relative hidden md:block">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search movies…"
              className="w-48 rounded-full border border-slate-300 bg-white/80 py-2 pl-9 pr-3 text-sm outline-none transition focus:w-64 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/30 dark:border-slate-700 dark:bg-slate-800/80 lg:w-56 lg:focus:w-72"
            />
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
          </form>

          <ThemeToggle className="hidden sm:flex" />

          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800 lg:hidden"
          >
            {mobileOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden bg-white transition-[max-height] duration-300 ease-in-out dark:bg-surface-dark lg:hidden ${
          mobileOpen ? 'max-h-[28rem]' : 'max-h-0'
        }`}
      >
        <div className="space-y-4 border-t border-slate-200 px-4 py-4 dark:border-slate-800">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search movies…"
              className="w-full rounded-full border border-slate-300 bg-white py-2.5 pl-9 pr-3 text-sm outline-none focus:border-primary-500 dark:border-slate-700 dark:bg-slate-800"
            />
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
          </form>

          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium ${
                    isActive
                      ? 'bg-primary-50 text-primary-600 dark:bg-primary-950/40 dark:text-primary-400'
                      : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                  }`
                }
              >
                {link.label}
                {link.label === 'Favorites' && favoritesCount > 0 && (
                  <span className="rounded-full bg-primary-600 px-2 py-0.5 text-[10px] font-bold text-white">
                    {favoritesCount}
                  </span>
                )}
              </NavLink>
            ))}
            <NavLink
              to="/about"
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2.5 text-sm font-medium ${
                  isActive
                    ? 'bg-primary-50 text-primary-600 dark:bg-primary-950/40 dark:text-primary-400'
                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                }`
              }
            >
              About
            </NavLink>
          </nav>

          <div className="flex items-center justify-between border-t border-slate-200 pt-4 dark:border-slate-800">
            <span className="text-sm text-slate-500 dark:text-slate-400">Theme</span>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
