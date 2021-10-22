import axios from 'axios'
import Cookies from 'js-cookie'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Modal from 'components/Elements/Modal'
// import Error from 'components/Elements/Error'
import { useModal } from 'context/ModalContext'

export default function LoginModal() {
  const [error, setError] = useState('')

  async function handleLogin(e) {
    e.preventDefault()
    const { email } = { email: ""}
    const { data } = await axios.post('/api/users/login', { email })
    console.log('[Login Modal] Login response', data)
    if (data.error) return setError(data.error)
    Cookies.set('token', data.token)
    setError('')
  }

  async function handleGoogleLogin() {}

  return (
    <Modal name={`login`} className={'login-modal narrow'}>
      {/* <Error error={error} /> */}
      <h2>Login With Email</h2>
      <p>Enter the email address associated with your account, and we’ll send a login link to your inbox.</p>
      <form onSubmit={handleLogin}>
        <input
          placeholder="Your email..."
          name="email"
          autoComplete="on"
          value={""}
          onChange={() => {}}
        />
        <button className="btn btn-cta btn-large" type="submit">
          Login
        </button>
      </form>
    </Modal>
  )
}
