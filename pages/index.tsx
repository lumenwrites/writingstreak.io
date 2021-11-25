import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Layout from 'components/Layout/Layout'
import PostFeed from 'components/Posts/PostFeed'
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
      <AdBoxes/>
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
    tagSlug: query.tagSlug,
    username: query.username,
    skip: config.postsPerPage * (parseInt(query.page?.toString()) - 1 || 0),
    take: config.postsPerPage,
  })
  return { props: { posts, postCount } }
}
