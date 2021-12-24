
import Layout from 'components/Layout/Layout'
import Landing from 'components/CTAs/Landing'

export default function Index({ username, copy }) {
  return <Landing copy={copy} />
}

import pages from 'backend/json/out/pages.json'
import { getUser } from 'prisma/api/users/get-user'

export async function getServerSideProps({ params, req }) {
  const user = await getUser(req)
  if (!user) {
    // If logged out - display landing page
    const copy = pages.find((p) => p.slug === 'landing')
    return { props: { copy } }
  }
  if (user.subscriptionStatus === 'FREE' && user.subscriptionExpired) {
    // If trial expired - redirect to paywall
    return { redirect: { permanent: false, destination: '/payments/trial-expired' }, props: {} }
  }
  if (user) {
    return { redirect: { permanent: false, destination: '/post/create' }, props: {} }
  }
}
