import Head from 'next/head'
import Layout from 'components/Layout/Layout'
import AdBoxes from 'components/CTAs/AdBoxes'
import config from 'config.json'

export default function Page({ post }) {
  // console.log('post.frontmatter.description', post.frontmatter.description)
  // console.log('post.frontmatter.thumbnail', `${config.domain}${post.frontmatter.thumbnail}`)
  return (
    <Layout>
      <div className="post page">
        <h1 className="h1-header orange">{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.body }} />
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
      {/* <AdBoxes /> */}
      <br />
    </Layout>
  )
}

import pages from 'backend/json/out/pages.json'

export async function getStaticProps({ params }) {
  let page = pages.find((page) => page.slug == params.pageSlug)
  // console.log('[pageSlug]', page.title, page.body)
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
