import axios from 'axios'
import Cookies from 'js-cookie'
import { useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import MessagePanel from 'components/Elements/MessagePanel'
import Spinner from 'components/Elements/Spinner'
import config from 'config.json'

export default function Subscribe() {
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
      message: `Success! Now check your email to confirm your subscription.`, // Thank you for subscribing! 
    })
    Cookies.set('subscribed', true)
  }

  return (
    <div className={`mailing-list`}>
      {config.subscribeCTA}
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
        <a className="btn-square" target="_blank" rel="noopener noreferrer" href={config.subscribeYoutubeLink}>
          <FontAwesomeIcon icon={['fab', 'youtube']} />
        </a>
        <a className="btn-square" target="_blank" rel="noopener noreferrer" href={config.subscribeTwitterLink}>
          <FontAwesomeIcon icon={['fab', 'twitter']} />
        </a>
        {/* <a className="btn-square" target="_blank" rel="noopener noreferrer" href={config.subscribeDiscordLink}>
          <FontAwesomeIcon icon={['fab', 'discord']} />
        </a> */}
        <div className="clearfix" />
        <MessagePanel type={form.state} message={form.message} />
      </div>
    </div>
  )
}
