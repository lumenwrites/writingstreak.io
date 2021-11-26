import Layout from 'components/Layout/Layout'
import PostFeed from 'components/Posts/PostFeed'
import AdBoxes from 'components/CTAs/AdBoxes'
import Subnav from 'components/Layout/Subnav'
import Pagination from 'components/Posts/Pagination'
import HomeHeader from 'components/CTAs/HomeHeader'
import SubscribeBox from 'components/CTAs/SubscribeBox'

export default function browse({ posts }) {
  return (
    <Layout>
      {/* <Layout subnav={<Subnav />}> */}
      {/* <HomeHeader /> */}
      <PostFeed posts={posts} />
      {/* <Pagination postCount={123} /> */}
      <SubscribeBox/>
      {/* <AdBoxes /> */}
      <br />
    </Layout>
  )
}

import { getPosts } from 'prisma/api/posts/get-posts'
import config from 'config.json'

export async function getServerSideProps({ req, query }) {
  const { posts, postCount } = await getPosts({
    published: true,
    searchString: query.search,
    username: query.username,
    tagSlug: query.tagSlug,
    skip: config.postsPerPage * (parseInt(query.page?.toString()) - 1 || 0),
    take: config.postsPerPage,
  })
  return { props: { posts, postCount } }
}
