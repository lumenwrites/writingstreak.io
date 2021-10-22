//@ts-nocheck
import { MDXRemote } from 'next-mdx-remote'
import Head from 'next/head'
import Layout from 'components/Layout/Layout'
import MDXComponents from 'components/Elements/MDXComponents'
import Sidebar from 'components/Layout/Sidebar'
import PrevNext from 'components/Posts/PrevNext'
import Chapters from 'components/Posts/Chapters'

export default function Page({ chapter, sections }) {
  // console.log(chapter, sections)
  return (
    <Layout>
      <Sidebar>
        <Chapters sections={sections}/>
      </Sidebar>
      <div className="main-content">
        <div className="post">
          <MDXRemote {...chapter.compiledMdx} components={MDXComponents} />
          <PrevNext post={chapter} />
          {/* <Chapters toc={post.toc} chapters={chapters} /> */}
          {/* <ChaptersFooter toc={post.toc} chapters={chapters} />
        <Head>
          <title>{post.frontmatter.title} | Godot Academy</title>
        </Head> */}
        </div>
      </div>
      {/* <SubscribeBox /> */}
    </Layout>
  )
}

import slugify from 'slugify'
import { join } from 'path'
import { readFileSync, readdirSync, lstatSync } from 'fs'
import { parseFrontmatter, renderMDX } from 'api/mdx'
const contentdir = join(process.cwd(), 'content')

function getSections() {
  let sections = []
  for (const dirName of readdirSync(contentdir)) {
    const sectionDirPath = join(contentdir, dirName)
    if (!lstatSync(sectionDirPath).isDirectory()) continue
    const sectionIndexText = readFileSync(`${sectionDirPath}/_index.md`, 'utf8')
    const sectionFrontmatter = parseFrontmatter(sectionIndexText)
    let section = {
      title: sectionFrontmatter.title,
      slug: sectionFrontmatter.slug,
      chapters: [],
    }
    for (const chapterFilename of readdirSync(sectionDirPath)) {
      if (chapterFilename == '_index.md') continue // ignore _index.md which is used for section info
      const chapterFilepath = `${sectionDirPath}/${chapterFilename}`
      const chapterText = readFileSync(chapterFilepath, 'utf8')
      const chapterFrontmatter = parseFrontmatter(chapterText)
      let chapter = {
        title: chapterFrontmatter.title,
        slug: chapterFrontmatter.slug,
        url: `/${section.slug}/${chapterFrontmatter.slug}`, // used in prev-next and probably toc
        filepath: chapterFilepath,
      }
      section.chapters.push(chapter)
    }
    sections.push(section)
  }
  // console.log(JSON.stringify(sections, null, 2))
  return sections
}

export async function getStaticProps({ params }) {
  const [sectionSlug, chapterSlug] = params.slug
  const sections = getSections()
  const section = sections.filter((section) => section.slug == sectionSlug)[0]
  const currentChapterIndex = section.chapters.findIndex((chapter) => chapter.slug === chapterSlug)
  let chapter = section.chapters[currentChapterIndex]
  chapter.prev = section.chapters[currentChapterIndex - 1] || null
  chapter.next = section.chapters[currentChapterIndex + 1] || null
  const chapterText = readFileSync(chapter.filepath, 'utf8')
  chapter.compiledMdx = await renderMDX(chapterText)
  // console.log(chapter.compiledMdx)
  return { props: { chapter, sections } }
}

export async function getStaticPaths() {
  let allPaths = []
  getSections().map((section) => {
    section.chapters.map((chapter) => {
      // console.log(section.slug, chapter.slug)
      allPaths.push({ params: { slug: [section.slug, chapter.slug] } })
    })
  })
  // console.log(JSON.stringify(allPaths, null, 2))
  return {
    paths: allPaths,
    fallback: false,
  }
}
