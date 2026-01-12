import VillageUploader from './VillageUploader'

const NewPage = () => {
  return (
    <div className="box">
      <h1>Upload Village Export</h1>
      <ol className="my-6 ml-4 list-decimal space-y-2 text-lg">
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

      <VillageUploader />
    </div>
  )
}

export default NewPage
