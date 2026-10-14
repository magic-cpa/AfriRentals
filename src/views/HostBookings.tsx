import React, { useEffect, useMemo, useState } from 'react'
import api from '../services/api'

interface Property {
  id: number
  title?: string
  description?: string
  base_price_cents?: number
  city?: string
}

interface Booking {
  id: number
  property: Property
  guest: { id: number; first_name?: string; last_name?: string; email?: string }
  check_in: string
  check_out: string
  status: string
  total_amount_cents?: number
}

const PAGE_SIZE = 10

const HostBookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [selectedPropertyId, setSelectedPropertyId] = useState<number | null>(null)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)

  const fetchBookings = async (requestedPage = 1, append = false) => {
    if (append) setLoadingMore(true)
    else setLoading(true)

    try {
      const res = await api.get(`/bookings/?page=${requestedPage}&page_size=${PAGE_SIZE}`)

      // DRF paginated response: { results: [...], next: url }
      if (res.data && Array.isArray(res.data.results)) {
        const results: Booking[] = res.data.results
        setBookings((cur) => (append ? [...cur, ...results] : results))
        setHasMore(Boolean(res.data.next))
        setPage(requestedPage)
      } else if (Array.isArray(res.data)) {
        // fallback: API returned full array (no pagination)
        if (append) {
          // shouldn't happen; avoid duplicating
          setHasMore(false)
        } else {
          setBookings(res.data)
          setHasMore(res.data.length >= PAGE_SIZE)
          setPage(requestedPage)
        }
      } else {
        // unknown structure
        console.warn('Unexpected bookings response shape', res.data)
      }
    } catch (err) {
      console.error('Error fetching bookings', err)
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }

  useEffect(() => {
    fetchBookings(1, false)
  }, [])

  const properties = useMemo(() => {
    const map = new Map<number, Property>()
    bookings.forEach((b) => {
      if (b.property && b.property.id) map.set(b.property.id, b.property)
    })
    return Array.from(map.values())
  }, [bookings])

  const filteredBookings = useMemo(() => {
    if (!selectedPropertyId) return bookings
    return bookings.filter((b) => b.property?.id === selectedPropertyId)
  }, [bookings, selectedPropertyId])

  const handleAction = async (id: number, action: 'confirm' | 'reject') => {
    try {
      await api.post(`/bookings/${id}/${action}/`)
      // refresh current page
      fetchBookings(1, false)
    } catch (err: any) {
      console.error(`${action} failed`, err?.response?.data || err)
      alert(err?.response?.data?.detail || 'Action failed')
    }
  }

  const loadMore = () => {
    if (loadingMore) return
    const nextPage = page + 1
    fetchBookings(nextPage, true)
  }

  return (
    <div className="mx-auto max-w-5xl px-5 py-10">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Host dashboard — Bookings</h2>
        <div className="flex items-center gap-3">
          <button onClick={() => fetchBookings(1, false)} className="rounded border px-3 py-1 text-sm">Refresh</button>
        </div>
      </div>

      <div className="mb-6 grid gap-4 md:grid-cols-[1fr_2fr]">
        <div className="rounded-md border p-4">
          <h3 className="mb-3 text-lg font-semibold">Filter by property</h3>
          <select
            className="w-full rounded border p-2"
            value={selectedPropertyId ?? ''}
            onChange={(e) => setSelectedPropertyId(e.target.value ? Number(e.target.value) : null)}
          >
            <option value="">All properties</option>
            {properties.map((p) => (
              <option key={p.id} value={p.id}>{p.title || `Property ${p.id}`}</option>
            ))}
          </select>

          {selectedPropertyId && (
            <div className="mt-4 rounded bg-gray-50 p-3">
              {properties.filter(p => p.id === selectedPropertyId).map(p => (
                <div key={p.id}>
                  <h4 className="text-md font-semibold">{p.title}</h4>
                  {p.city && <p className="text-sm text-stone-600">{p.city}</p>}
                  {typeof p.base_price_cents === 'number' && <p className="text-sm text-stone-600">Base price: ${(p.base_price_cents/100).toFixed(2)}</p>}
                  {p.description && <p className="mt-2 text-sm text-stone-700">{p.description}</p>}
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          {loading && <p>Loading...</p>}
          {!loading && filteredBookings.length === 0 && <p>No bookings found for the selected filter.</p>}

          <ul className="space-y-4">
            {filteredBookings.map((b) => (
              <li key={b.id} className="rounded-md border p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{b.property?.title || 'Property'}</h3>
                    <p className="text-sm text-stone-600">Guest: {b.guest?.first_name || b.guest?.email || '—' } {b.guest?.last_name || ''}</p>
                    <p className="text-sm text-stone-600">Dates: {b.check_in} → {b.check_out}</p>
                    {typeof b.total_amount_cents === 'number' && <p className="text-sm text-stone-600">Total: ${(b.total_amount_cents/100).toFixed(2)}</p>}
                    <p className="text-sm text-stone-600">Status: <strong>{b.status}</strong></p>
                  </div>
                  <div className="flex items-center gap-2">
                    {b.status === 'pending' && (
                      <>
                        <button onClick={() => handleAction(b.id, 'confirm')} className="rounded bg-green-600 px-3 py-1 text-white">Confirm</button>
                        <button onClick={() => handleAction(b.id, 'reject')} className="rounded bg-red-600 px-3 py-1 text-white">Reject</button>
                      </>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {(hasMore || loadingMore) && (
            <div className="mt-6 flex justify-center">
              <button onClick={loadMore} disabled={loadingMore} className="rounded border px-4 py-2">
                {loadingMore ? 'Loading...' : 'Load more'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default HostBookings
