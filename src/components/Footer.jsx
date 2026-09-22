import { Link } from 'react-router-dom'
import { NAV_LINKS } from '../utils/constants.js'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-16 border-t border-slate-200 bg-white/60 dark:border-slate-800 dark:bg-surface-dark/60">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-2 font-display text-lg font-extrabold">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 text-white">
                🎬
              </span>
              Cine<span className="text-gradient">Scope</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-slate-500 dark:text-slate-400">
              Discover popular, top rated and upcoming movies. Search, browse by genre, and keep track of your
              favorites.
            </p>
          </div>

          <div>
            <h4 className="mb-3 font-display text-sm font-semibold uppercase tracking-wide text-slate-800 dark:text-slate-100">
              Explore
            </h4>
            <ul className="space-y-2 text-sm">
              {NAV_LINKS.slice(0, 5).map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-slate-500 transition hover:text-primary-500 dark:text-slate-400">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-3 font-display text-sm font-semibold uppercase tracking-wide text-slate-800 dark:text-slate-100">
              Account
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/favorites" className="text-slate-500 transition hover:text-primary-500 dark:text-slate-400">
                  Favorites
                </Link>
              </li>
              <li>
                <Link to="/search" className="text-slate-500 transition hover:text-primary-500 dark:text-slate-400">
                  Search
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-500 transition hover:text-primary-500 dark:text-slate-400">
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 font-display text-sm font-semibold uppercase tracking-wide text-slate-800 dark:text-slate-100">
              Data Source
            </h4>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Movie data and images are provided by{' '}
              <a
                href="https://www.themoviedb.org/"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-primary-500 hover:underline"
              >
                The Movie Database (TMDB)
              </a>
              . This product uses the TMDB API but is not endorsed or certified by TMDB.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-slate-200 pt-6 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-500 sm:flex-row">
          <p>© {year} CineScope. Built for portfolio purposes.</p>
          <p>Made with React, Tailwind CSS &amp; Zustand.</p>
        </div>
      </div>
    </footer>
  )
}
