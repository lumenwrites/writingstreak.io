import Link from 'components/Elements/Link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { MDXRemote } from 'next-mdx-remote'
import Head from 'next/head'
import Layout from 'components/Layout/Layout'
import SubscribeBox from 'components/Layout/SubscribeBox'
import AdBoxes from 'components/Layout/AdBoxes'
import MDXComponents from 'components/Elements/MDXComponents'
import config from 'config.json'
import PostFooter from 'components/Posts/PostFooter'
import Comments from 'components/Comments/Comments'

export default function Post({ post }) {
  return (
    <Layout>
      <div className="post blog-post">
        <MDXRemote {...post.compiledMdx} components={MDXComponents} />
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
      {/* <AdBoxes /> */}
      {/* <SubscribeBox /> */}
      {/* <RelatedPosts post={post} /> */}
      <Comments/>
      <br />
    </Layout>
  )
}
import PostCard from 'components/Posts/PostCard'

function RelatedPosts({ post }) {
  if (!post.relatedPosts || !post.relatedPosts.length) return null
  return (
    <div className="related-posts">
      <h2>Related Posts</h2>
      {post.relatedPosts.map((p) => (
        <PostCard key={p.slug} post={p} />
      ))}
    </div>
  )
}

import posts from 'backend/json/posts/posts.json'

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
