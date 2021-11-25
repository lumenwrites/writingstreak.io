import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Layout from 'components/Layout/Layout'
import PostGrid from 'components/Posts/PostGrid'
import PostFeed from 'components/Posts/PostFeed'
import SubscribeBox from 'components/Layout/SubscribeBox'
import AdBoxes from 'components/Layout/AdBoxes'
import Subnav from 'components/Layout/Subnav'
import TagHeader from 'components/Layout/TagHeader'
import HomeHeader from 'components/CTAs/HomeHeader'
import Pagination from 'components/Posts/Pagination'

export default function browse({ posts }) {
  return (
    <Layout>
      <HomeHeader />
      <TagHeader/>
      <Subnav />
      <PostFeed posts={posts} />
      <Pagination postCount={123}/>
      {/* <SubscribeBox /> */}
      <AdBoxes/>
      <br />
    </Layout>
  )
}

import posts from 'backend/json/out/posts.json'

export async function getStaticProps() {
  return { props: { posts } }
}
