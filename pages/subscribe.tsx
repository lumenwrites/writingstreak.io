import Image from 'next/image'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import MessagePanel from 'components/Elements/MessagePanel'
import Spinner from 'components/Elements/Spinner'

export default function subscribe() {
  return <SubscribePage />
}

function SubscribePage() {
  const emailInput = useRef(null)
  const [form, setForm] = useState({ state: '', message: '' })
  
  async function submitEmail() {
    setForm({ state: 'loading', message: '' })

    const { data } = await axios.post('/api/subscribe', {
      email: emailInput.current.value,
    })
    if (data.error) return setForm({ state: 'error', message: data.error })

    emailInput.current.value = ''
    setForm({
      state: 'success',
      message: `Success! Now check your email to confirm your subscription.`,
    })
    Cookies.set('subscribed', true)
  }

  return (
    <div className="subscribe-landing">
      <div className="form-card">
        <div className="header">
          <div className="logo">
            <Image src="/logo.png" width={90} height={90} />
          </div>
          <h1>Godot Academy</h1>
          <p>Learn to make games with Godot!</p>
        </div>
        <div className="description">
          Receive updates on my new Tutorials, Assets, and Courses.
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
                Subscribe
              </button>
            )}
            <div className="clearfix" />
            <MessagePanel type={form.state} message={form.message} />
            <div className="disclaimer">
              I respect your privacy. Unsubscribe at any time. <br />
              I will email you no more frequently than once per week.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
