import { BACKDROP_SIZES, IMAGE_BASE_URL, PLACEHOLDER_POSTER, POSTER_SIZES } from './constants.js'

export const getPosterUrl = (path, size = 'md') =>
  path ? `${IMAGE_BASE_URL}/${POSTER_SIZES[size] || POSTER_SIZES.md}${path}` : PLACEHOLDER_POSTER

export const getBackdropUrl = (path, size = 'md') =>
  path ? `${IMAGE_BASE_URL}/${BACKDROP_SIZES[size] || BACKDROP_SIZES.md}${path}` : PLACEHOLDER_POSTER

export const formatDate = (dateString) => {
  if (!dateString) return 'TBA'
  const date = new Date(dateString)
  if (Number.isNaN(date.getTime())) return 'TBA'
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

export const formatYear = (dateString) => {
  if (!dateString) return '—'
  return dateString.slice(0, 4)
}

export const formatRuntime = (minutes) => {
  if (!minutes && minutes !== 0) return 'N/A'
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  if (h === 0) return `${m}m`
  return `${h}h ${m}m`
}

export const formatRating = (voteAverage) => {
  if (voteAverage === undefined || voteAverage === null) return 'N/A'
  return voteAverage.toFixed(1)
}

export const formatCurrency = (amount) => {
  if (!amount) return 'N/A'
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(
    amount
  )
}

export const truncate = (text, max = 160) => {
  if (!text) return ''
  return text.length > max ? `${text.slice(0, max).trim()}…` : text
}
