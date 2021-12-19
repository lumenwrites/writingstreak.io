import axios from 'axios'
import Cookies from 'js-cookie'
import { useState } from 'react'

import Modal from 'components/Elements/Modal'
import SpinnerButton from 'components/Elements/SpinnerButton'
import MessagePanel from 'components/Elements/MessagePanel'
import { useModal } from 'context/ModalContext'
import { useAuth } from 'context/AuthContext'
import useForm from 'hooks/useForm'

// const defaultJoinInputs = { username: 'user3', email: 'user3@gmail.com', password: 'pass3' }
// const defaultLoginInputs = { email: 'user3@gmail.com', password: 'pass3' }
const defaultJoinInputs = { username: '', email: '', password: '' }
const defaultLoginInputs = { email: '', password: '' }

export default function LoginModal() {
  const { inputs: joinInputs, handleChange: joinChange, clearForm: clearJoin } = useForm(defaultJoinInputs)
  const { inputs: loginInputs, handleChange: loginChange, clearForm: clearLogin } = useForm(defaultLoginInputs)
  const { fetchUser } = useAuth()
  const { toggleModal } = useModal()
  const [status, setStatus] = useState({ state: '', message: '' })

  async function handleJoin(e) {
    e.preventDefault()
    setStatus({ state: 'join-loading', message: '' })
    const { username, email, password } = joinInputs
    const missingFields = !username?.trim() || !email?.trim() || !password?.trim()
    if (missingFields) return setStatus({ state: 'error', message: "Provide username, email, and password." })
    const { data } = await axios.post('/api/users/signup', { username, email, password })
    console.log('[Login Modal] Join response', data)
    if (data.error) return setStatus({ state: 'error', message: data.error })
    Cookies.set('token', data.token)
    fetchUser() // refetch user
    setStatus({ state: '', message: '' })
    toggleModal('login')
    window.location.href = '/post/create'
  }

  async function handleLogin(e) {
    e.preventDefault()
    setStatus({ state: 'login-loading', message: '' })
    const { email, password } = loginInputs
    const { data } = await axios.post('/api/users/login', { email, password })
    console.log('[Login Modal] Login response', data)
    if (data.error) return setStatus({ state: 'error', message: data.error })
    Cookies.set('token', data.token)
    fetchUser() // refetch user
    setStatus({ state: '', message: '' })
    toggleModal('login')
    window.location.href = '/post/create'
  }

  return (
    <Modal name={`login`} className={'login-modal narrow'}>
      <MessagePanel type={status.state} message={status.message} />
      <h2>Join</h2>
      <form onSubmit={handleJoin}>
        <input
          placeholder="Your username (no spaces)..."
          name="username"
          autoComplete="on"
          value={joinInputs.username}
          onChange={joinChange}
        />
        <input
          placeholder="Your email..."
          name="email"
          autoComplete="on"
          value={joinInputs.email}
          onChange={joinChange}
        />
        <input
          placeholder="Your password (5+ characters)..."
          name="password"
          type="password"
          autoComplete="on"
          value={joinInputs.password}
          onChange={joinChange}
        />
        <SpinnerButton className="btn btn-cta btn-large" type="submit" isloading={status.state === 'join-loading'}>
          Join
        </SpinnerButton>
      </form>
      <hr />
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          placeholder="Your email..."
          name="email"
          autoComplete="on"
          value={loginInputs.email}
          onChange={loginChange}
        />
        <input
          placeholder="Your password..."
          name="password"
          type="password"
          autoComplete="on"
          value={loginInputs.password}
          onChange={loginChange}
        />
        <SpinnerButton className="btn btn-cta btn-large" type="submit" isloading={status.state === 'login-loading'}>
          Login
        </SpinnerButton>
      </form>
    </Modal>
  )
}
