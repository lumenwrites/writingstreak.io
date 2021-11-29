import Link from 'components/Elements/Link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Head from 'next/head'
import Layout from 'components/Layout/Layout'
import SubscribeBox from 'components/CTAs/SubscribeBox'
import AdBoxes from 'components/CTAs/AdBoxes'
import config from 'config.json'
import PostFooter from 'components/Posts/PostFooter'
import Comments from 'components/Comments/Comments'

export default function Post({ post }) {
  console.log('post', post)
  return (
    <Layout>
      <div className="post blog-post">
        <h1 className="h1-header orange">{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.body }} />
        <PostFooter post={post} />
        <Head>
          <title>{post.title}</title>
          <meta property="og:title" content={`${post.title}`} key="ogtitle" />
          <meta name="twitter:title" content={`${post.title}`} key="ogtitle" />
          <meta property="og:description" content={post.description} key="ogdesc" />
          <meta name="twitter:description" content={post.description} />
          {post.socialImage && <meta property="og:image" content={`${config.domain}${post.socialImage}`} key="ogimage" />}
          {post.socialImage && <meta name="twitter:image" content={`${config.domain}${post.socialImage}`} />}
        </Head>
      </div>
      <AdBoxes />
      <SubscribeBox/>
      <Comments post={post}/>
      <br />
    </Layout>
  )
}

import { getPost } from 'prisma/api/posts/get-post'

export async function getServerSideProps({ params }) {
  const post = await getPost({ slug: params.postSlug })
  return { props: { post } }
}
