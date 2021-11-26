import Head from 'next/head'
import Layout from 'components/Layout/Layout'
import AdBoxes from 'components/CTAs/AdBoxes'
import config from 'config.json'

export default function Post({ post }) {
  return (
    <div className="blog-post">
      {post.body}
      <Head>
        <title>
          {post.title} | {config.title}
        </title>
        <meta property="og:title" content={`${post.title} | ${config.title}`} key="ogtitle" />
        <meta property="og:description" content={post.description} key="ogdesc" />
        <meta name="twitter:description" content={post.description} />
        {post.thumbnail && (
          <>
            <meta property="og:image" content={`${config.domain}${post.thumbnail}`} key="ogimage" />
            <meta name="twitter:image" content={`${config.domain}${post.thumbnail}`} />
          </>
        )}
      </Head>
      <AdBoxes />
    </div>
  )
}
