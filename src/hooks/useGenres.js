import { useEffect, useState } from 'react'
import { getGenres } from '../services/movieService.js'

// Module-level cache so the genre list is only ever fetched once per session.
let cachedGenres = null
let inFlight = null

export default function useGenres() {
  const [genres, setGenres] = useState(cachedGenres || [])
  const [loading, setLoading] = useState(!cachedGenres)

  useEffect(() => {
    if (cachedGenres) {
      setGenres(cachedGenres)
      setLoading(false)
      return
    }

    if (!inFlight) {
      inFlight = getGenres()
    }

    let cancelled = false
    inFlight
      .then((res) => {
        cachedGenres = res.genres || []
        if (!cancelled) setGenres(cachedGenres)
      })
      .catch(() => {
        if (!cancelled) setGenres([])
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  const getGenreNames = (genreIds = []) =>
    genreIds
      .map((id) => genres.find((g) => g.id === id)?.name)
      .filter(Boolean)

  return { genres, loading, getGenreNames }
}
