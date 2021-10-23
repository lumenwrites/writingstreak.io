import axios from 'axios'
import { useState } from 'react'

import { useModal } from 'context/ModalContext'
import Modal from 'components/Elements/Modal'
import SpinnerButton from 'components/Elements/SpinnerButton'
import MessagePanel from 'components/Elements/MessagePanel'

export default function LoginModal() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState({ state: '', message: '' })

  async function handleLogin(event) {
    event.preventDefault()
    setStatus({ state: 'loading', message: '' })
    const { data } = await axios.post('/api/users/send-magic-link', { email })
    console.log('[Login Modal] Login response', data)
    if (data.error) return setStatus({ state: 'error', message: data.error })
    setStatus({ state: 'success', message: `` })
  }

  if (status.state === 'success') {
    return (
      <Modal name={`login`} className={'login-modal narrow'}>
        <h2>Check your inbox!</h2>
        <p>Email is on its way!</p>
        <p>Click the link we sent to <b>{email}</b> to sign in.</p>
      </Modal>
    )
  }

  return (
    <Modal name={`login`} className={'login-modal narrow'}>
      <h2>Login With Email</h2>
      <MessagePanel type={status.state} message={status.message} />
      <p>Enter the email address associated with your account, and we’ll send a login link to your inbox.</p>
      <form onSubmit={handleLogin}>
        <input
          placeholder="Your email..."
          name="email"
          autoComplete="on"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <SpinnerButton isloading={status.state === 'loading'} type="submit">
          Login
        </SpinnerButton>
      </form>
    </Modal>
  )
}
