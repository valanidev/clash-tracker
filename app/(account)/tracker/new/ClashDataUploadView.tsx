import { ClashData } from '../../schemas/clashSchema'
import BuildingImage from '../../components/BuildingImage'

const ClashDataUploadView = ({ clashData }: { clashData: ClashData }) => {
  const townhallId = 1000001
  const builderHallId = 1000058
  const townhallLevel =
    clashData.buildings.find((item) => item.data === townhallId)?.lvl ?? 1
  const builderHallLevel =
    clashData.buildings2.find((item) => item.data === builderHallId)?.lvl ?? 1

  return (
    <div className="box">
      <h2 className="mb-4 text-center font-semibold">{clashData.tag}</h2>
      <div className="flex flex-col items-center justify-evenly gap-4 md:flex-row">
        <div>
          <BuildingImage itemId={townhallId} level={townhallLevel} />
          <p className="mt-2 text-center text-xl font-semibold">
            Town Hall {townhallLevel}
          </p>
        </div>
        <div>
          <BuildingImage itemId={builderHallId} level={builderHallLevel} />
          <p className="mt-2 text-center text-xl font-semibold">
            Builder Hall {builderHallLevel}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ClashDataUploadView
