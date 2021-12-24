import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useModal } from 'context/ModalContext'

import Modal from 'components/Elements/Modal'
// import Burndown from 'components/Stats/Burndown'

import dynamic from 'next/dynamic'

const BurndownNoSSR = dynamic(() => import('./Burndown'), { ssr: false })

export default function StatsModal() {
  const { toggleModal } = useModal()

  return (
    <Modal name={`stats`} className={'stats-modal'}>
      <h1>Progress towards your writing goal</h1>
      <BurndownNoSSR />
    </Modal>
  )
}
