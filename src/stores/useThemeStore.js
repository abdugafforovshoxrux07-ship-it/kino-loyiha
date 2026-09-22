import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const getSystemPreference = () => {
  if (typeof window === 'undefined') return 'dark'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

/**
 * Theme store — persists the chosen theme ('light' | 'dark') to localStorage
 * and keeps the <html> element's `dark` class in sync so Tailwind's
 * `dark:` variants work everywhere.
 */
export const useThemeStore = create(
  persist(
    (set, get) => ({
      theme: getSystemPreference(),

      toggleTheme: () => {
        const next = get().theme === 'dark' ? 'light' : 'dark'
        document.documentElement.classList.toggle('dark', next === 'dark')
        set({ theme: next })
      },

      setTheme: (theme) => {
        document.documentElement.classList.toggle('dark', theme === 'dark')
        set({ theme })
      },
    }),
    {
      name: 'cinescope-theme',
      onRehydrateStorage: () => (state) => {
        if (state) {
          document.documentElement.classList.toggle('dark', state.theme === 'dark')
        }
      },
    }
  )
)
