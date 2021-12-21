import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'components/Elements/Link'
import Layout from 'components/Layout/Layout'

export default function ThankYou() {
  return (
    <Layout>
      <div className="post text thankyou">
        <h1>Payment Cancelled</h1>
        <p>Looks like something went wrong and your payment has been cancelled.</p>
        <p>If you want to upgrade your account, you can do it in the <Link href="/user/settings">settings</Link>.</p>
        <p>
          If you have any questions or need any help - don't hesitate to send me a message to{' '}
          <b>lumenwrites@gmail.com</b>.
        </p>
      </div>
    </Layout>
  )
}
