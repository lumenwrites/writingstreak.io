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
      <div className="post text">
        <h1 className="post-title orange">{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.body }} />
        <PostFooter post={post} />
        <Head>
          <title>{post.socialTitle || post.title}</title>
          <meta property="og:title" content={`${post.socialTitle || post.title}`} key="ogtitle" />
          <meta name="twitter:title" content={`${post.socialTitle || post.title}`} key="ogtitle" />
          <meta name="description" content={post.socialDescription || post.description} />
          <meta property="og:description" content={post.socialDescription || post.description} key="ogdesc" />
          <meta name="twitter:description" content={post.socialDescription || post.description} />
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
