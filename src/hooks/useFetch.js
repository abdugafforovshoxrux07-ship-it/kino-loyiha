import { useEffect, useRef, useState, useCallback } from 'react'

/**
 * Generic data-fetching hook that standardizes loading / error / data state
 * for any async fetcher function coming from the service layer.
 *
 * @param {Function} fetcher - async function returning data
 * @param {Array} deps - dependency array, re-fetches when these change
 * @param {Object} options - { skip: boolean } to conditionally skip fetching
 */
export default function useFetch(fetcher, deps = [], options = {}) {
  const { skip = false } = options
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(!skip)
  const [error, setError] = useState(null)
  const fetcherRef = useRef(fetcher)
  fetcherRef.current = fetcher

  const refetch = useCallback(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    fetcherRef
      .current()
      .then((result) => {
        if (!cancelled) setData(result)
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || 'Failed to load data.')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  useEffect(() => {
    if (skip) return undefined
    const cancel = refetch()
    return cancel
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, skip])

  return { data, loading, error, refetch }
}
