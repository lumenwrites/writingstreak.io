import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Layout from 'components/Layout/Layout'
import PostGrid from 'components/Posts/PostGrid'
import PostFeed from 'components/Posts/PostFeed'
import SubscribeBox from 'components/Layout/SubscribeBox'
import AdBoxes from 'components/Layout/AdBoxes'
import Subnav from 'components/Layout/Subnav'
import TagHeader from 'components/Layout/TagHeader'

export default function browse({ posts }) {
  return (
    <Layout subnav={<Subnav />}>
      {/* <PostGrid posts={posts} /> */}
      {/* <TagHeader/> */}
      <PostFeed posts={posts} />
      <SubscribeBox />
      {/* <AdBoxes/> */}
      <br />
    </Layout>
  )
}

import posts from 'backend/json/posts/posts.json'

export async function getStaticProps() {
  return { props: { posts } }
}
