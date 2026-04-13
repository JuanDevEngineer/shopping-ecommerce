import { useState, useEffect, useCallback } from 'react'

/**
 * Generic data-fetching hook with AbortController support.
 *
 * @param {(signal: AbortSignal) => Promise<any>} queryFn
 *   An async function that receives an AbortSignal and returns data.
 *   Must throw (or reject) on error — never return null for errors.
 *
 * @param {any[]} deps
 *   Dependency array (like useEffect). Re-runs whenever any dep changes.
 *   Pass [] for one-shot fetches, or variables to watch.
 *
 * @returns {{ data: any, status: 'loading'|'success'|'error', error: Error|null, refetch: () => void }}
 *
 * @example
 * const { data: products, status } = useQuery(
 *   (signal) => api.getProducts('/products?limit=20', signal),
 *   []
 * )
 */
export function useQuery(queryFn, deps = []) {
  const [data, setData] = useState(null)
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState(null)
  const [tick, setTick] = useState(0)

  const refetch = useCallback(() => setTick((t) => t + 1), [])

  useEffect(() => {
    const controller = new AbortController()
    setStatus('loading')
    setError(null)

    queryFn(controller.signal)
      .then((result) => {
        setData(result)
        setStatus('success')
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setError(err)
          setStatus('error')
        }
      })

    return () => controller.abort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, tick])

  return { data, status, error, refetch }
}
