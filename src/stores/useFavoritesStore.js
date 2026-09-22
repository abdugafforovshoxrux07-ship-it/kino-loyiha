import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/**
 * Favorites store — keeps a list of favorited movies in memory and
 * persists them to localStorage under the 'cinescope-favorites' key.
 */
export const useFavoritesStore = create(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (movie) => {
        if (get().favorites.some((m) => m.id === movie.id)) return
        set({ favorites: [...get().favorites, movie] })
      },

      removeFavorite: (movieId) => {
        set({ favorites: get().favorites.filter((m) => m.id !== movieId) })
      },

      toggleFavorite: (movie) => {
        const exists = get().favorites.some((m) => m.id === movie.id)
        if (exists) {
          set({ favorites: get().favorites.filter((m) => m.id !== movie.id) })
        } else {
          set({ favorites: [...get().favorites, movie] })
        }
      },

      isFavorite: (movieId) => get().favorites.some((m) => m.id === movieId),

      clearFavorites: () => set({ favorites: [] }),
    }),
    {
      name: 'cinescope-favorites',
    }
  )
)
