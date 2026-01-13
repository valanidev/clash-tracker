'use client'

import { useState } from 'react'
import LinkButton from '../../components/LinkButton'

import { Clipboard, HousePlus } from 'lucide-react'
import { addVillage } from '../../actions'
import { ActionResult } from '@/types/utils'
import AlertMessage from '@/components/AlertMessage'
import ClashDataUploadView from './ClashDataUploadView'
import { ClashData, clashDataSchema } from '../../schemas/clashSchema'

const isDataValid = (data: string) => {
  if (!data) return false
  if (data.trim() === '') return false
  try {
    const json = JSON.parse(data)
    const parsed = clashDataSchema.safeParse(json)
    if (!parsed.success) return false
  } catch {
    return false
  }

  return true
}

const VillageUploader = () => {
  const [data, setData] = useState<ActionResult<ClashData> | null>()
  const [uploadStatus, setUploadStatus] = useState<ActionResult | null>(null)

  const handlePaste = async () => {
    setData(null)
    try {
      const text = await navigator.clipboard.readText()
      if (!text) {
        setData({
          success: false,
          message: 'Clipboard is empty',
        })
        return
      }
      if (!isDataValid(text)) {
        setData({
          success: false,
          message: 'The content provided is not valid game data',
        })
        return
      }

      const parsed = JSON.parse(text) as ClashData
      setData({ success: true, data: parsed, message: 'Success' })
    } catch (e) {
      setData({ success: false, message: String(e) })
    }
  }

  const handleUpload = async () => {
    if (!data || !data.success || !data.data) return
    const res = await addVillage(data.data)
    setUploadStatus(res)
  }

  return (
    <>
      <LinkButton
        icon={<Clipboard />}
        text="Paste Village Data"
        style="success"
        className="md:max-w-1/3"
        onClick={handlePaste}
      />
      <div className="mt-2 border p-2">
        <p>
          <span className="font-semibold">Status:</span>{' '}
          <span
            className={data && data.success ? 'text-green-600' : 'text-red-600'}
          >
            {data ? data?.message : 'No export provided'}
          </span>
        </p>
      </div>

      {data && data.success && data.data && (
        <div className="mt-4">
          <ClashDataUploadView clashData={data.data} />
          <LinkButton
            text="Add Village"
            icon={<HousePlus />}
            className="mt-4"
            onClick={handleUpload}
          />
          {uploadStatus && (
            <AlertMessage
              message={uploadStatus.message ? uploadStatus.message : ''}
              type={uploadStatus.success ? 'success' : 'error'}
              className="mt-2"
            />
          )}
        </div>
      )}
    </>
  )
}

export default VillageUploader
