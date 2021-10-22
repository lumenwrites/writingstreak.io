import { MDXRemote } from 'next-mdx-remote'
import Head from 'next/head'

import { getPosts } from 'api/posts'
import Layout from 'components/Layout/Layout'
import SubscribeBox from 'components/Layout/SubscribeBox'
import MDXComponents from 'components/Elements/MDXComponents'
import config from 'config.json'

export default function Post({ post }) {
  // console.log('post.frontmatter.description', post.frontmatter.description)
  // console.log('post.frontmatter.thumbnail', `${config.domain}${post.frontmatter.thumbnail}`)
  return (
    <Layout toc={post.toc}>
      <div className="page post">
        <MDXRemote {...post.serialized} components={MDXComponents} />
        <Head>
          <title>{post.frontmatter.title} | {config.title}</title>
          <meta property="og:title" content={`${post.frontmatter.title} | ${config.title}`} key="ogtitle" />
          <meta property="og:description" content={post.frontmatter.description} key="ogdesc" />
          <meta name="twitter:description" content={post.frontmatter.description} />
          {post.frontmatter.thumbnail && (
            <>
              <meta property="og:image" content={`${config.domain}${post.frontmatter.thumbnail}`} key="ogimage" />
              <meta name="twitter:image" content={`${config.domain}${post.frontmatter.thumbnail}`} />
            </>
          )}
        </Head>
      </div>
      <SubscribeBox />
    </Layout>
  )
}

import { join } from 'path'
import { readFileSync, readdirSync } from 'fs'
import { parseFrontmatter, renderMDX } from 'api/mdx'

const contentdir = join(process.cwd(), 'content')

export async function getStaticProps({ params }) {
  console.log('params', params)
  const postFilePath = join(contentdir, 'post', `${params.postSlug}.md`)
  const postText = readFileSync(postFilePath)
  const post = await renderMDX(postText) // { serialized, frontmatter, toc }
  return { props: { post } }
}

// Generate static pages. Takes a list of all the available posts,
// loops through them and passes their slugs to getStaticProps.
// each unique postSlug will generate a unique static page.
export async function getStaticPaths() {
  const posts = getPosts()
  // console.log('getStaticPaths', posts)
  return {
    paths: posts.map((post) => ({
      params: { postSlug: post.slug },
    })),
    fallback: false,
  }
}
