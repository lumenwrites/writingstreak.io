import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useModal } from 'context/ModalContext'

import Modal from 'components/Elements/Modal'


export default function PurchaseModal() {
  const { toggleModal } = useModal()

  return (
    <Modal name={`purchase`} className={'login-modal narrow'}>
      <h1>Modal Title</h1>
      <button className="btn btn-cta" onClick={() => {}}>
        <FontAwesomeIcon icon={['fas', 'arrow-circle-up']} />
        Button
      </button>
    </Modal>
  )
}
