import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { useModal } from 'context/ModalContext'

export default function Modal({ children, name, className=""}) {
  const { modal, toggleModal } = useModal()
  if (modal !== name) return null
  return (
    <div className={`modal-wrapper `}>
      <div className={`modal-card ${className}`}>
        <div className="close-button" onClick={() => toggleModal(name)}>
          <FontAwesomeIcon icon={["fas", "times"]} />
        </div>
        <div>{children}</div>
      </div>
      
      <div className="modal-bg" onClick={() => toggleModal(name)} />
    </div>
  )
}
