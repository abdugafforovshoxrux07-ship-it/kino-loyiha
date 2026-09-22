import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <span className="font-display text-8xl font-extrabold text-gradient">404</span>
      <h1 className="mt-4 font-display text-2xl font-bold text-slate-800 dark:text-slate-100">
        Scene Not Found
      </h1>
      <p className="mt-2 max-w-sm text-sm text-slate-500 dark:text-slate-400">
        The page you're looking for got cut from the final edit. Let's get you back to the main feature.
      </p>
      <Link
        to="/"
        className="mt-6 rounded-full bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:bg-primary-700 active:scale-95"
      >
        Back to Home
      </Link>
    </div>
  )
}
