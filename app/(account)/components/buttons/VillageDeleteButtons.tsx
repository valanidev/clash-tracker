'use client'

import { removeVillage } from '@/app/(account)/actions'
import LinkButton from '@/app/(account)/components/LinkButton'
import { useRouter } from 'next/navigation'
import { StepBack, Trash } from 'lucide-react'
import { ActionResult } from '@/types/utils'
import { useState } from 'react'
import AlertMessage from '@/components/AlertMessage'

const VillageDeleteButtons = ({ tag }: { tag: string }) => {
  const router = useRouter()
  const [result, setResult] = useState<ActionResult | null>(null)

  const handleDelete = async () => {
    const res = await removeVillage(tag)
    setResult(res)

    if (res.success) {
      router.push('/me')
    }
  }

  return (
    <>
      <div className="grid gap-2 md:grid-cols-2">
        <LinkButton
          text="Delete"
          style="danger"
          icon={<Trash />}
          onClick={handleDelete}
        />
        <LinkButton target="/me" icon={<StepBack />} text="Cancel" />
      </div>
      {result && !result.success && (
        <AlertMessage type="error" message={result.message} className="mt-4" />
      )}
    </>
  )
}

export default VillageDeleteButtons
