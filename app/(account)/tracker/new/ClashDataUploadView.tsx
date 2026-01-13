import { ClashData } from '@/types/clash'

const ClashDataUploadView = ({ clashData }: { clashData: ClashData }) => {
  return (
    <div className="box">
      <pre>{JSON.stringify(clashData, null, 2)}</pre>
    </div>
  )
}

export default ClashDataUploadView
