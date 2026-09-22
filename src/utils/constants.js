export const IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_URL || 'https://image.tmdb.org/t/p'

export const POSTER_SIZES = {
  sm: 'w185',
  md: 'w342',
  lg: 'w500',
  original: 'original',
}

export const BACKDROP_SIZES = {
  sm: 'w780',
  md: 'w1280',
  original: 'original',
}

export const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Popular', path: '/popular' },
  { label: 'Top Rated', path: '/top-rated' },
  { label: 'Now Playing', path: '/now-playing' },
  { label: 'Upcoming', path: '/upcoming' },
  { label: 'Genres', path: '/genres' },
  { label: 'Favorites', path: '/favorites' },
]

export const PLACEHOLDER_POSTER =
  'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="342" height="513" viewBox="0 0 342 513"%3E%3Crect width="342" height="513" fill="%23202436"/%3E%3Ctext x="50%25" y="50%25" fill="%236b7280" font-family="sans-serif" font-size="20" text-anchor="middle" dy=".3em"%3ENo Poster%3C/text%3E%3C/svg%3E'
