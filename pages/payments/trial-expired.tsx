import Paywall from 'components/Payments/Paywall'
import Layout from 'components/Layout/Layout'

export default function TrialExpired() {
  return (
    <Layout>
      <Paywall />
    </Layout>
  )
}

import { getUser } from 'prisma/api/users/get-user'

export async function getServerSideProps({ req, params }) {
  const user = await getUser(req)
  if (!user) return { redirect: { permanent: false, destination: '/' }, props: {} }
  if (user.subscriptionStatus !== 'FREE' || !user.trialExpired) {
    // If trial has not expired - redirect to /
    return { redirect: { permanent: false, destination: '/' }, props: {} }
  }
  return { props: {} }
}
