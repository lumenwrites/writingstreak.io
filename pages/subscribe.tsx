import Image from 'next/image'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import MessagePanel from 'components/Elements/MessagePanel'
import SpinnerButton from 'components/Elements/SpinnerButton'

export default function subscribe() {
  return <SubscribePage />
}

function SubscribePage() {
  const emailInput = useRef(null)
  const [form, setForm] = useState({ state: '', message: '' })

  async function handleSubmit(e) {
    e.preventDefault()
    console.log('Yes')
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
            <Image src="/img/logo-spaceship.png" width={90} height={90} alt="logo" />
          </div>
          <h1>
            Writing for Makers <br />
            Free 7-Day Email Course
          </h1>
          <p className="subheader">
            The ultimate guide to writing online and growing your audience (by{' '}
            <a href={'https://twitter.com/lumenwrites'} target="_blank" rel="noopener noreferrer">
              @lumenwrites
            </a>
            )
          </p>
        </div>
        <div className="description">
          <p>
            Writing online is the best way for entrepreneurs and content creators to grow their reach and build an
            audience for their projects.
          </p>
          <p>My course will help you to:</p>
          <ul>
            <li>Figure out what content people want to read, and plan out a high-leverage content strategy.</li>
            <li>
              Learn a simple step-by-step process for outlining, writing, formatting, and publishing high quality posts.
            </li>
            <li>Become prolific - develop a system that helps you to write regularly and never run out of ideas.</li>
            <li>
              Learn to write quickly, so you can create content even when you&#39;re busy building your startup or
              running a business.
            </li>
            <li>
              Create a marketing strategy, promote your posts, and build an audience (even if you&#39;re starting from
              scratch).
            </li>
          </ul>
          <p>Start learning now:</p>

          <form className="form" onSubmit={handleSubmit}>
            <input
              ref={emailInput}
              aria-label="Email for newsletter"
              placeholder="Enter your email..."
              type="email"
              autoComplete="email"
              required
            />
            <SpinnerButton className="btn-subscribe" isloading={form.state === 'loading'} type="submit">
              Receive your Free Course!
            </SpinnerButton>
            <div className="clearfix" />
            <MessagePanel type={form.state} message={form.message} />
            <div className="disclaimer">
              I know you're busy, I respect your privacy, and I don't email too often.
              <br />
              You can easily unsubscribe at any time.
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
