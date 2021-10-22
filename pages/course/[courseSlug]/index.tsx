import { MDXRemote } from 'next-mdx-remote'
import { getAllCourses, getChapters } from 'api/courses'

import Head from 'next/head'
import Layout from 'components/Layout/Layout'
import SubscribeBox from 'components/Layout/SubscribeBox'
import MDXComponents from 'components/Elements/MDXComponents'
import Chapters from 'components/Posts/Chapters'
import ChaptersFooter from 'components/Posts/ChaptersFooter'
import PrevNext from 'components/Posts/PrevNext'

export default function Post({ post, chapters }) {
  return (
    <Layout>
      <div className="page post">
        <MDXRemote {...post.serialized} components={MDXComponents} />
        <PrevNext post={post} chapters={chapters} />
        {/* <Chapters toc={post.toc} chapters={chapters} /> */}
        <ChaptersFooter toc={post.toc} chapters={chapters} />
        <Head>
          <title>{post.frontmatter.title} | Godot Academy</title>
        </Head>
      </div>
      <SubscribeBox />
    </Layout>
  )
}

import { join } from 'path'
import { readFileSync, readdirSync } from 'fs'
import { parseFrontmatter, renderMDX } from 'api/mdx'

const basedir = join(process.cwd(), 'content', 'course')

export async function getStaticProps({ params }) {
  const { courseSlug } = params
  const postFilePath = join(basedir, `${courseSlug}/_index.md`)
  const postText = readFileSync(postFilePath)
  const post = await renderMDX(postText) // { serialized, frontmatter, toc }
  const chapters = getChapters(courseSlug)
  return { props: { post, chapters } }
}

export async function getStaticPaths() {
  const courses = await getAllCourses()
  const allPaths = courses.map((course) => ({
    params: { courseSlug: course.slug },
  }))
  return {
    paths: allPaths,
    fallback: false,
  }
}
