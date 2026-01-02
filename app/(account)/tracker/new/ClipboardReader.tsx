'use client'

import { useState } from 'react'

export default function ClipboardReader() {
  const [data, setData] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handlePaste = async () => {
    setError(null)
    setLoading(true)
    try {
      if (!navigator.clipboard || !navigator.clipboard.readText) {
        throw new Error('Clipboard API not available')
      }
      const text = await navigator.clipboard.readText()
      if (!text) {
        throw new Error('Clipboard is empty')
      }
      let parsed
      try {
        parsed = JSON.parse(text)
      } catch (e) {
        throw new Error('Clipboard content is not JSON')
      }
      setData(parsed)
    } catch (e) {
      setError(String(e))
      setData(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <button
        className="rounded-lg bg-gray-800 p-2"
        onClick={handlePaste}
        disabled={loading}
      >
        Paste JSON from clipboard...
      </button>
      {error && <div className="mt-2 text-red-500">{error}</div>}
      {data && (
        <>
          {data.tag && (
            <h2 className="mt-2 font-semibold">Your tag: {data.tag} </h2>
          )}
          <pre className="mt-2 rounded-lg bg-white/5 p-2">
            {JSON.stringify(data, null, 2)}
          </pre>
        </>
      )}
    </div>
  )
}
