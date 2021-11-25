import Link from 'components/Elements/Link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Head from 'next/head'
import Layout from 'components/Layout/Layout'
import AdBoxes from 'components/Layout/AdBoxes'
import config from 'config.json'
import PostFooter from 'components/Posts/PostFooter'
import Comments from 'components/Comments/Comments'

export default function Post({ post }) {
  return (
    <Layout>
      <div className="post blog-post">
        {post.body}
        <PostFooter post={post} />
        {/* <CourseCTA/> */}
        <Head>
          <title>{post.title}</title>
          <meta property="og:title" content={`${post.title}`} key="ogtitle" />
          <meta name="twitter:title" content={`${post.title}`} key="ogtitle" />
          <meta property="og:description" content={post.description} key="ogdesc" />
          <meta name="twitter:description" content={post.description} />
          {post.social && <meta property="og:image" content={`${config.domain}${post.social}`} key="ogimage" />}
          {post.social && <meta name="twitter:image" content={`${config.domain}${post.social}`} />}
        </Head>
      </div>
      <AdBoxes />
      {/* <SubscribeBox /> */}
      {/* <RelatedPosts post={post} /> */}
      <Comments/>
      <br />
    </Layout>
  )
}

import posts from 'backend/json/out/posts.json'

export async function getStaticProps({ params }) {
  const post = posts.find((post) => post.slug == params.postSlug)
  return { props: { post } }
}

export async function getStaticPaths() {
  return {
    paths: posts.map((post) => ({
      params: { postSlug: post.slug },
    })),
    fallback: false,
  }
}
