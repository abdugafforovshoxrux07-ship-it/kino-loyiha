import { useThemeStore } from '../stores/useThemeStore.js'

export default function ThemeToggle({ className = '' }) {
  const theme = useThemeStore((s) => s.theme)
  const toggleTheme = useThemeStore((s) => s.toggleTheme)
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle light and dark theme"
      className={`relative flex h-9 w-16 items-center rounded-full border border-slate-300 bg-slate-200 px-1 transition-colors duration-300 dark:border-slate-700 dark:bg-slate-800 ${className}`}
    >
      <span
        className={`flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-md transition-transform duration-300 dark:bg-slate-900 ${
          isDark ? 'translate-x-7' : 'translate-x-0'
        }`}
      >
        {isDark ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21.75 15.5A9.75 9.75 0 1 1 12 2.25a.75.75 0 0 1 .6 1.24 7.5 7.5 0 0 0 9.16 9.16.75.75 0 0 1 .99.85 9.78 9.78 0 0 1-1 2Z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-500" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 4.5a1 1 0 0 1-1-1V2a1 1 0 1 1 2 0v1.5a1 1 0 0 1-1 1Zm0 15a1 1 0 0 1 1 1V22a1 1 0 1 1-2 0v-1.5a1 1 0 0 1 1-1Zm9-6.5h-1.5a1 1 0 1 1 0-2H21a1 1 0 1 1 0 2Zm-16.5 0H3a1 1 0 0 1 0-2h1.5a1 1 0 1 1 0 2Zm12.02-6.36-1.06 1.06a1 1 0 1 1-1.42-1.42l1.06-1.06a1 1 0 0 1 1.42 1.42Zm-10.6 10.6-1.06 1.06a1 1 0 1 1-1.42-1.42l1.06-1.06a1 1 0 1 1 1.42 1.42ZM17.44 17.44a1 1 0 0 1 1.42 0l1.06 1.06a1 1 0 1 1-1.42 1.42l-1.06-1.06a1 1 0 0 1 0-1.42ZM5.08 5.08a1 1 0 0 1 1.42 0l1.06 1.06A1 1 0 1 1 6.14 7.56L5.08 6.5a1 1 0 0 1 0-1.42ZM12 7.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Z" />
          </svg>
        )}
      </span>
    </button>
  )
}
