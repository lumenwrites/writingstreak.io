import axios from 'axios'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'components/Elements/Link'
import Layout from 'components/Layout/Layout'

export default function ThankYou() {
  const router = useRouter()
  async function saveSessionId(session_id) {
    const { data } = await axios.post('/api/payments/subscription-success', { session_id })
    console.log('Saved session id', data)
  }
  useEffect(() => {
    const { success, session_id } = router.query
    if (session_id) saveSessionId(session_id)
  }, [router])
  return (
    <Layout>
      <div className="post text thankyou">
        <h1>Thank you!</h1>
        <p>Thank you for subscribing to Writing Streak!</p>
        <p>You can manage your subscription in the <Link href="/user/settings">settings</Link>.</p>
        <p>
          If you have any questions or need any help - don't hesitate to send me a message to{' '}
          <b>lumenwrites@gmail.com</b>.
        </p>
        <p>
          Now, <Link href="/post/create">go start writing</Link>!
        </p>
      </div>
    </Layout>
  )
}
