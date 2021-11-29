import Layout from 'components/Layout/Layout'
import PostFeed from 'components/Posts/PostFeed'
import Subnav from 'components/Layout/Subnav'
import Pagination from 'components/Posts/Pagination'
import ProfileHeader from 'components/Users/ProfileHeader'
import TagHeader from 'components/Layout/TagHeader'
import SubscribeBox from 'components/CTAs/SubscribeBox'
import AdBoxes from 'components/CTAs/AdBoxes'
import Head from 'next/head'

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
      <Head>
        <title>lumen's blog at nexy</title>
        <meta property="og:title" content={`lumen's blog at nexy`} key="ogtitle" />
        <meta name="twitter:title" content={`lumen's blog at nexy`} key="ogtitle" />
        <meta
          property="og:description"
          content={
            'Startup Founder, Web Developer, Writer. I write about things that gratify my intellectual curiosity.'
          }
          key="ogdesc"
        />
        <meta
          name="twitter:description"
          content={
            'Startup Founder, Web Developer, Writer. I write about things that gratify my intellectual curiosity.'
          }
        />
        <meta property="og:image" content={`https://nexy.io/img/social-lumen.png`} key="ogimage" />
        <meta name="twitter:image" content={`https://nexy.io/img/social-lumen.png`} />
      </Head>
      <br />
    </Layout>
  )
}

import { getPosts } from 'prisma/api/posts/get-posts'
import config from 'config.json'

export async function getServerSideProps({ req, query }) {
  const { username, sort, tag, search } = query
  // console.log('username', username)
  const { posts, postCount } = await getPosts({
    published: true,
    searchString: search,
    username: username[0].replace('@',''),
    tagSlug: tag,
    sort: sort,
    skip: config.postsPerPage * (parseInt(query.page?.toString()) - 1 || 0),
    take: config.postsPerPage,
  })
  return { props: { posts, postCount, username } }
}
