import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Modal from "components/Elements/Modal"

export default function DownloadsModal({ files }) {
  return (
    <Modal name={`download-files`} className={"downloads-modal"}>
      <h1>Download Files</h1>
      <div className="files">
        {files.map((f) => (
          <div className="file" key={f.url}>
            <span className="file-name">{f.name}</span>
            <a className="btn download" href={`${f.url}`}>
              <FontAwesomeIcon icon={['fas', 'download']} />
              Download
            </a>
          </div>
        ))}
      </div>
    </Modal>
  )
}

