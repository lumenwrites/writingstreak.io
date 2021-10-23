//@ts-nocheck
import slugify from 'slugify'
import { join, resolve } from 'path'
import { readFileSync, readdirSync, writeFileSync, lstatSync } from 'fs'
import { parseFrontmatter, renderMDX } from 'backend/mdx'

const contentdir = join(process.cwd(), 'content')
// const contentdir = resolve('./content')

export function getSections() {
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

export async function getChapter(sections, sectionSlug, chapterSlug) {
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
  return chapter
}

export async function processContent() {
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
      const compiledMdx = await renderMDX(chapterText)
      let chapter = {
        title: chapterFrontmatter.title,
        slug: chapterFrontmatter.slug,
        url: `/${section.slug}/${chapterFrontmatter.slug}`, // used in prev-next and probably toc
        filepath: chapterFilepath,
        compiledMdx
      }
      section.chapters.push(chapter)
    }
    sections.push(section)
  }
  // console.log(JSON.stringify(sections, null, 2))

  for (const [sectionIndex, section] of sections.entries()) {
    for (const [chapterIndex, chapter] of section.chapters.entries()) {
      let prevChapter = section.chapters[chapterIndex - 1] || null
      let nextChapter = section.chapters[chapterIndex + 1] || null
      // Next/prev button between sections
      // If this is the first chapter, but not the first section
      if (!prevChapter && sectionIndex > 0) {
        const prevSection = sections[sectionIndex - 1]
        prevChapter = prevSection.chapters[prevSection.chapters.length - 1]
      }
      // If this is the last chapter, but not the last section
      if (!nextChapter && sectionIndex < sections.length - 1) {
        const nextSection = sections[sectionIndex + 1]
        nextChapter = nextSection.chapters[0]
      }
      chapter.prev = prevChapter ? { title: prevChapter.title, url: prevChapter.url } : null
      chapter.next = nextChapter ? { title: nextChapter.title, url: nextChapter.url } : null
    }
  }
  const toc = sections.map((section) => {
    return {
      title: section.title,
      slug: section.slug, //for "key" prop
      chapters: section.chapters.map((chapter) => {
        return {
          title: chapter.title,
          slug: chapter.slug, // for "active" chapter
          url: chapter.url
        }
      })
    }
  })
  const content = {}
  for (const section of sections) {
    let chapters = {}
    for (const chapter of section.chapters) {
      chapters[chapter.slug] = chapter
    }
    section.chapters = chapters
    content[section.slug] = section
  }
  // console.log(JSON.stringify(sections, null, 2))
  writeFileSync('content.json', JSON.stringify(content))
  writeFileSync('toc.json', JSON.stringify(toc))
  return sections
}
