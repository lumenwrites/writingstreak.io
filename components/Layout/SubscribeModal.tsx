import axios from 'axios'
import Cookies from 'js-cookie'
import { useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import MessagePanel from 'components/Elements/MessagePanel'
import Spinner from 'components/Elements/Spinner'
import Modal from 'components/Elements/Modal'
import { useModal } from 'context/ModalContext'

export default function SubscribeModal() {
  const emailInput = useRef(null)
  const [form, setForm] = useState({ state: '', message: '' })
  const { toggleModal } = useModal()

  async function submitEmail() {
    setForm({ state: 'loading', message: '' })

    const { data } = await axios.post('/api/subscribe', {
      email: emailInput.current.value,
    })
    if (data.error) return setForm({ state: 'error', message: data.error })

    emailInput.current.value = ''
    setForm({
      state: 'success',
      message: `Thank you for subscribing!`,
    })
    Cookies.set('subscribed', true)
    toggleModal('download-files')
  }

  return (
    <Modal name={`subscribe`} className={'subscribe-modal mailing-list narrow'}>
      Enter your email to download files:
      <div className="form">
        <input
          ref={emailInput}
          aria-label="Email for newsletter"
          placeholder="Enter your email..."
          type="email"
          autoComplete="email"
          required
        />
        {form.state === 'loading' ? (
          <button className="btn-subscribe disabled" disabled>
            <Spinner />
          </button>
        ) : (
          <button className="btn-subscribe" onClick={submitEmail}>
            <FontAwesomeIcon icon={['fas', 'download']} />{" "}
            Download
          </button>
        )}
        <div className="clearfix" />
        <MessagePanel type={form.state} message={form.message} />
      </div>
    </Modal>
  )
}
