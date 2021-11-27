import Layout from 'components/Layout/Layout'
import PostFeed from 'components/Posts/PostFeed'
import Subnav from 'components/Layout/Subnav'
import Pagination from 'components/Posts/Pagination'
import ProfileHeader from 'components/Users/ProfileHeader'
import TagHeader from 'components/Layout/TagHeader'
import SubscribeBox from 'components/CTAs/SubscribeBox'
import AdBoxes from 'components/CTAs/AdBoxes'

export default function browse({ posts, tagSlug, username }) {
  return (
    <Layout
      subnav={
        <>
          <ProfileHeader />
          <Subnav />
        </>
      }
    >
      <PostFeed posts={posts} />
      {/* <Pagination postCount={123}/> */}
      {/* <AdBoxes/> */}
      <SubscribeBox />
      <br />
    </Layout>
  )
}

import { getPosts } from 'prisma/api/posts/get-posts'
import config from 'config.json'

export async function getServerSideProps({ req, query }) {
  const { username, sort, tag, search } = query
  const { posts, postCount } = await getPosts({
    published: true,
    searchString: search,
    username: username,
    tagSlug: tag,
    sort: sort,
    skip: config.postsPerPage * (parseInt(query.page?.toString()) - 1 || 0),
    take: config.postsPerPage,
  })
  return { props: { posts, postCount, username } }
}
