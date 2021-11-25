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
        {/* {post.body} */}
        <PostFooter post={post} />
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
      {/* <AdBoxes /> */}
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
