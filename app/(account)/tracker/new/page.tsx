import Image from 'next/image'
import VillageUploader from './VillageUploader'

const NewPage = () => {
  return (
    <div className="box">
      <h1>Upload Village Export</h1>
      <div className="my-6 flex flex-col gap-4 md:flex-row md:justify-between">
        <ol className="ml-4 list-decimal space-y-2 text-lg">
          <li>
            Open the in-game <b>Settings</b> menu
          </li>
          <li>
            Press <b>More Settings</b>
          </li>
          <li>
            Scroll to the bottom to <b>Data Export</b> and press the <b>Copy</b>{' '}
            button
          </li>
          <li>
            Press the <b>Paste Village Data</b> button below
          </li>
        </ol>
        <div className="relative min-h-16 w-full md:w-1/2 md:min-w-sm">
          <Image
            src="/assets/in-game-export.png"
            alt="In-Game Export"
            fill
            className="object-contain"
            loading="eager"
          />
        </div>
      </div>

      <VillageUploader />
    </div>
  )
}

export default NewPage
