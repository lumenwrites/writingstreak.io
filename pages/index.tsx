import Layout from 'components/Layout/Layout'
import Browse from 'components/Posts/Browse'
import SubscribeBox from 'components/Layout/SubscribeBox'
import AdBoxes from 'components/Layout/AdBoxes'

export default function browse({ posts }) {
  return (
    <Layout>
      <Browse posts={posts} />
      <SubscribeBox />
      <AdBoxes/><br/>
    </Layout>
  )
}

import posts from 'backend/json/posts/posts.json'

export async function getStaticProps() {
  return { props: { posts } }
}
