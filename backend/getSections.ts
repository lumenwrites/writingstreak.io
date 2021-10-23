//@ts-nocheck
import slugify from 'slugify'
import { join, resolve } from 'path'
import { readFileSync, readdirSync, lstatSync } from 'fs'
import { parseFrontmatter, renderMDX } from 'backend/mdx'

// const contentdir = join(process.cwd(), 'content')
const contentdir = resolve('./content')

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
