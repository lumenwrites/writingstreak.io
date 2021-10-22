import Cookies from 'js-cookie'
import { useModal } from 'context/ModalContext'

import DownloadsModal from 'components/Layout/DownloadsModal'

export default function DownloadFiles({ files }) {
  const { toggleModal } = useModal()

  function openModal() {
    const subscribed = Cookies.get('subscribed')
    if (subscribed) {
      toggleModal('download-files')
    } else {
      toggleModal('subscribe')
    }
  }
  if (!files) return null
  return (
    <div>
      <button className="btn btn-cta download-project-files" onClick={openModal}>
        Download Project Files
      </button>
      <DownloadsModal files={files} />
    </div>
  )
}
