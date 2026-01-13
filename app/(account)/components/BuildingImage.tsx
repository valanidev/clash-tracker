import Image from 'next/image'

type TownhallImageProps = {
  itemId: number
  level: number
}

const BuildingImage = ({ itemId, level }: TownhallImageProps) => {
  return (
    <div className="relative flex h-50 w-50 items-center justify-center">
      <Image
        src={`/assets/coc-images/${itemId}/${level}.png`}
        alt={`Item ${level}`}
        width={0}
        height={0}
        sizes="100vw"
        className="h-50 w-auto"
      />
    </div>
  )
}

export default BuildingImage
