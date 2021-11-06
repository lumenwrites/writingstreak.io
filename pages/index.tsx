import Layout from 'components/Layout/Layout'
import PostGrid from 'components/Posts/PostGrid'
import PostFeed from 'components/Posts/PostFeed'
import SubscribeBox from 'components/Layout/SubscribeBox'
import AdBoxes from 'components/Layout/AdBoxes'

export default function browse({ posts }) {
  return (
    <Layout>
      {/* <PostGrid posts={posts} /> */}
      <PostFeed posts={posts} />
      <SubscribeBox />
      {/* <AdBoxes/> */}
      <br/>
    </Layout>
  )
}

import posts from 'backend/json/posts/posts.json'

export async function getStaticProps() {
  return { props: { posts } }
}
