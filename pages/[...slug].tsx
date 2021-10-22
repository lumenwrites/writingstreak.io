//@ts-nocheck
import Head from 'next/head'
import Link from 'components/Elements/Link'
import { MDXRemote } from 'next-mdx-remote'
import MDXComponents from 'components/Elements/MDXComponents'
import Layout from 'components/Layout/Layout'
import PrevNext from 'components/Posts/PrevNext'
import Chapters from 'components/Posts/Chapters'
import config from 'config.json'

export default function Page({ chapter, sections }) {
  return (
    <Layout sidebarChildren={<Chapters sections={sections} />}>
      <div className="post">
        <div className="content-locked">
          <p>You need to purchase the course to view this content.</p>
          <p>If you're already enrolled, you'll need to login.</p>

          <a href={'/'} className="btn btn-cta-landing">
            Enroll Now! ($20)
          </a>
          <div className="btn btn-login">Login</div>
        </div>
        {/* put meta here too */}
      </div>
    </Layout>
  )

  return (
    <Layout sidebarChildren={<Chapters sections={sections} />}>
      <div className="post">
        <MDXRemote {...chapter.compiledMdx} components={MDXComponents} />
        <PrevNext post={chapter} />
        <Head>
          <title>
            {chapter.title} | {config.title}
          </title>
          <meta property="og:title" content={`${chapter.title} | ${config.title}`} key="ogtitle" />
          {/* <meta property="og:description" content={chapter.description} key="ogdesc" />
          <meta name="twitter:description" content={post.frontmatter.description} />
          {post.frontmatter.thumbnail && (
            <>
              <meta property="og:image" content={`${config.domain}${post.frontmatter.thumbnail}`} key="ogimage" />
              <meta name="twitter:image" content={`${config.domain}${post.frontmatter.thumbnail}`} />
            </>
          )} */}
        </Head>
      </div>
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
  const currentSectionIndex = sections.findIndex((section) => section.slug === sectionSlug)
  const section = sections[currentSectionIndex]

  const currentChapterIndex = section.chapters.findIndex((chapter) => chapter.slug === chapterSlug)
  let chapter = section.chapters[currentChapterIndex]
  chapter.prev = section.chapters[currentChapterIndex - 1] || null
  chapter.next = section.chapters[currentChapterIndex + 1] || null
  // Next/prev button between sections
  // If this is the last chapter, but not the last section
  if (!chapter.next && currentSectionIndex < sections.length - 1) {
    const nextSection = sections[currentSectionIndex + 1]
    chapter.next = nextSection.chapters[0]
  }
  // If this is the first chapter, but not the first section
  if (!chapter.prev && currentSectionIndex > 0) {
    const prevSection = sections[currentSectionIndex - 1]
    chapter.prev = prevSection.chapters[prevSection.chapters.length - 1]
  }
  // Render MDX
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
