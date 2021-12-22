import Link from 'components/Elements/Link'
import Layout from 'components/Layout/Layout'

export default function ThankYou() {
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
