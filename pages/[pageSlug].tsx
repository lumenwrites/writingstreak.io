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
      <div className="post page">
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

import pages from 'backend/json/pages/pages.json'

export async function getStaticProps({ params }) {
  const page = pages.find((page) => page.slug == params.pageSlug)
  console.log('[pageSlug]', page.title)
  return { props: { post: page } }
}

export async function getStaticPaths() {
  // console.log('getStaticPaths', posts)
  return {
    paths: pages.map((page) => ({
      params: { pageSlug: page.slug },
    })),
    fallback: false,
  }
}
