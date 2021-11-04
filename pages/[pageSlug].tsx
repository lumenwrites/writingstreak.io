import { MDXRemote } from 'next-mdx-remote'
import Head from 'next/head'
import Layout from 'components/Layout/Layout'
import SubscribeBox from 'components/Layout/SubscribeBox'
import AdBoxes from 'components/Layout/AdBoxes'
import MDXComponents from 'components/Elements/MDXComponents'
import config from 'config.json'

export default function Page({ post }) {
  // console.log('post.frontmatter.description', post.frontmatter.description)
  // console.log('post.frontmatter.thumbnail', `${config.domain}${post.frontmatter.thumbnail}`)
  return (
    <Layout>
      <div className="page post adventure">
        <MDXRemote {...post.compiledMdx} components={MDXComponents} />
        <Head>
          <title>{post.title} | {config.title}</title>
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
  console.log('post', post.title)
  return { props: { post } }
}

export async function getStaticPaths() {
  // console.log('getStaticPaths', posts)
  return {
    paths: posts.map((post) => ({
      params: { postSlug: post.slug },
    })),
    fallback: false,
  }
}
