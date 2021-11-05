import { MDXRemote } from 'next-mdx-remote'
import Head from 'next/head'
import Layout from 'components/Layout/Layout'
import SubscribeBox from 'components/Layout/SubscribeBox'
import AdBoxes from 'components/Layout/AdBoxes'
import CourseCTA from 'components/Elements/CourseCTA'
import MDXComponents from 'components/Elements/MDXComponents'
import config from 'config.json'

export default function Post({ post }) {
  return (
    <Layout>
      <div className="post blog-post">
        <MDXRemote {...post.compiledMdx} components={MDXComponents} />
        {/* <CourseCTA/> */}
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
      </div>
      <AdBoxes />
      <SubscribeBox />
      <br/>
    </Layout>
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
