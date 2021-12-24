import Layout from 'components/Layout/Layout'
import PostFeed from 'components/Posts/PostFeed'
import Subnav from 'components/Layout/Subnav'
import Pagination from 'components/Posts/Pagination'
import ProfileHeader from 'components/Users/ProfileHeader'
import TagHeader from 'components/Layout/TagHeader'
import SubscribeBox from 'components/CTAs/SubscribeBox'
import AdBoxes from 'components/CTAs/AdBoxes'
import Head from 'next/head'

export default function browse({ posts, profile, days }) {
  return (
    <Layout
      subnav={
        <>
          <ProfileHeader profile={profile} days={days} />
          <Subnav />
        </>
      }
    >
      <PostFeed posts={posts} />
      {/* <Pagination postCount={123}/> */}
      {/* <AdBoxes/> */}
      <SubscribeBox />
      <Head>
        <title>
          {profile.username}'s blog at {config.title}
        </title>
        <meta property="og:title" content={`${profile.username}'s blog at ${config.title}`} key="ogtitle" />
        <meta name="twitter:title" content={`${profile.username}'s blog at ${config.title}`} key="ogtitle" />
        <meta name="description" content={profile.bio} />
        <meta property="og:description" content={profile.bio} key="ogdesc" />
        <meta name="twitter:description" content={profile.bio} />
        {/* <meta property="og:image" content={`https://nexy.io/img/social-lumen.png`} key="ogimage" />
        <meta name="twitter:image" content={`https://nexy.io/img/social-lumen.png`} /> */}
      </Head>
      <br />
    </Layout>
  )
}

import { getPosts } from 'prisma/api/posts/get-posts'
import { getUser } from 'prisma/api/users/get-user'
import { getProfile } from 'prisma/api/users/get-profile'
import { getDays } from 'prisma/api/stats/get-days'

import config from 'config.json'

export async function getServerSideProps({ req, query }) {
  const { sort, tag, search } = query
  const user = await getUser(req)
  const profile = await getProfile(query.username)

  // Redirect to / if the profile not found
  if (!profile) return { redirect: { permanent: false, destination: '/' }, props: {} }

  // For Profile Header
  const { bio, website, twitter, username } = profile
  const days = await getDays(profile, 366)

  // If the logged in user is looking at his own profile, show them drafts as well
  let isProfileAuthor = false
  if (user && profile.username === user.username) isProfileAuthor = true
  const { posts, postCount } = await getPosts({
    published: isProfileAuthor ? undefined : true,
    searchString: search,
    username: username,
    tagSlug: tag,
    sort: sort,
    skip: config.postsPerPage * (parseInt(query.page?.toString()) - 1 || 0),
    take: config.postsPerPage,
  })
  return { props: { posts, postCount, days, profile: { bio, website, twitter, username } } }
}
