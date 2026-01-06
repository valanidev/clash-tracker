'use client'

import { ClashData } from '@/types/clash'
import { useState } from 'react'
import { addVillage } from '../../actions'
import { ActionResult } from '@/types/utils'
import ActionMessage from '@/components/ui/ActionMessage'
import Link from 'next/link'

const isDataValid = (data: string) => {
  if (!data) return false
  if (data.trim() === '') return false
  let jsonData
  try {
    jsonData = JSON.parse(data)
  } catch {
    return false
  }

  if (jsonData.tag === undefined || jsonData.timestamp === undefined) {
    return false
  }
  if (jsonData.buildings === undefined || jsonData.traps === undefined) {
    return false
  }
  if (jsonData.buildings2 === undefined || jsonData.traps2 === undefined) {
    return false
  }

  return true
}

const ClipboardReader = () => {
  const [data, setData] = useState<ClashData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const [result, setResult] = useState<ActionResult | null>(null)

  const handlePaste = async () => {
    setResult(null)
    setError(null)
    setLoading(true)

    try {
      const text = await navigator.clipboard.readText()
      if (!text) {
        throw new Error('Clipboard is empty')
      }
      if (!isDataValid(text)) {
        throw new Error('The content provided is not valid game data')
      }
      const parsed = JSON.parse(text)
      setData(parsed)
    } catch (e) {
      setError(String(e))
      setData(null)
    } finally {
      setLoading(false)
    }
  }

  const handleUpload = async (data: ClashData) => {
    setLoading(true)
    const res = await addVillage(data)
    setResult(res)
    setLoading(false)
  }

  return (
    <div>
      <button className="box p-2" onClick={handlePaste} disabled={loading}>
        Paste JSON from clipboard...
      </button>
      {error && <div className="mt-2 text-red-500">{error}</div>}
      {data && (
        <>
          <h2 className="mt-2 font-semibold">Your tag: {data.tag} </h2>
          <button
            onClick={() => handleUpload(data)}
            className="rounded-xl bg-lime-700 px-4 py-2 text-white hover:bg-lime-800 disabled:bg-lime-900"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Add this village'}
          </button>
          {result && <ActionMessage actionResult={result} />}
          {result && result.success && (
            <Link
              href={`/tracker/${data.tag.replace('#', '')}`}
              className="font-semibold text-blue-500 underline"
            >
              view village
            </Link>
          )}
          <pre className="mt-2 rounded-lg bg-white/5 p-2">
            {JSON.stringify(data, null, 2)}
          </pre>
        </>
      )}
    </div>
  )
}

export default ClipboardReader
