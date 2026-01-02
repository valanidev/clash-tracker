'use client'

import { Button } from '@/components/ui/button'
import { addVillage } from '../actions'

const AddVillageButton = () => {
  const handleClick = async () => {
    addVillage('22UUR8UOL')
  }

  return (
    <Button className="bg-lime-700" onClick={handleClick}>
      Add Village
    </Button>
  )
}

export default AddVillageButton
