import Layout from 'components/Layout/Layout'

export default function Settings() {
  return (
    <Layout>
      <div className="settings text">
        <h1>Settings</h1>
        <a className="btn btn-cta" href="/api/payments/create-customer-portal-session">
          Manage my Subscription
        </a>
      </div>
    </Layout>
  )
}
