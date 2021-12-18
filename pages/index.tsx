import Layout from 'components/Layout/Layout'
import Landing from 'components/CTAs/Landing'
import CreatePost from './post/create'
import Paywall from 'components/Payments/Paywall'

export default function Index({ username, copy }) {
  if (false) {
    return (
      <Layout>
        <Paywall />
      </Layout>
    )
  }
  if (username) {
    return <CreatePost />
  }
  return <Landing copy={copy} />
}

import pages from 'backend/json/out/pages.json'
import { getUser } from 'prisma/api/users/get-user'

export async function getServerSideProps({ params, req }) {
  const user = await getUser(req)
  if (!user) {
    const copy = pages.find((p) => p.slug === 'writing-streak-landing')
    return { props: { copy } }
  }
  return { props: { username: user.username } }
}
