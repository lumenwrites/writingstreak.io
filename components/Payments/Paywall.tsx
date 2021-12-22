import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'components/Elements/Link'
import { useAuth } from 'context/AuthContext'

export default function Paywall() {
  const { user } = useAuth()

  return (
    <div className="paywall text">
      <h1>Your free trial has expired</h1>
      <p>Upgrade your subscription to continue using Writing Streak:</p>
      <a className="btn btn-cta-landing" href="/api/payments/create-checkout-session">
        <FontAwesomeIcon icon={['fas', 'arrow-circle-up']} />
        Upgrade ($20/mo)
      </a>
      <p>
        (you can still see and edit all your posts on your <Link href={`/@${user.username}`}>profile</Link>).
      </p>
    </div>
  )
}
