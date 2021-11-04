//@ts-nocheck
import slugify from 'slugify'
import { join } from 'path'
import { readFileSync, readdirSync, writeFileSync, lstatSync, existsSync } from 'fs'
import { parseFrontmatter, renderMDX } from './mdx.mjs'
import config from '../../config.json'
const contentdir = config.contentdir
const jsondir = join(process.cwd(), './backend/json/courses')

async function processCourse(courseDirName) {
  const courseDir = join(contentdir, 'courses', courseDirName)
  let sections = []
  for (const dirName of readdirSync(courseDir)) {
    const sectionDirPath = join(courseDir, dirName)
    if (!lstatSync(sectionDirPath).isDirectory()) continue

    // Skip folders inside of the .ignore file
    if (existsSync(`${courseDir}/.ignore`)) {
      const ignoreText = readFileSync(`${courseDir}/.ignore`, 'utf8')
      const ignoreFolders = ignoreText.split('\n')
      if (ignoreFolders.includes(dirName)) continue
    }

    // Folder names start with a number, like 01, to conveniently order them in file system.
    // Remove numbers to generate section title, slugify it to generaet slug
    const dirTitle = dirName.substring(dirName.indexOf(' ') + 1)
    let section = {
      title: dirTitle,
      slug: slugify(dirTitle, { lower: true, strict: true }),
      chapters: [],
    }
    // If there's a file called _index.md inside the section folder - take the custom title/slug values from there
    if (existsSync(`${sectionDirPath}/_index.md`)) {
      const sectionIndexText = readFileSync(`${sectionDirPath}/_index.md`, 'utf8')
      const sectionFrontmatter = parseFrontmatter(sectionIndexText)
      section.title = sectionFrontmatter.title
      section.slug = sectionFrontmatter.slug
    }

    for (const chapterFilename of readdirSync(sectionDirPath)) {
      if (chapterFilename == '_index.md') continue // ignore _index.md which is used for section info
      const chapterFilepath = `${sectionDirPath}/${chapterFilename}`
      const chapterText = readFileSync(chapterFilepath, 'utf8')
      const chapterFrontmatter = parseFrontmatter(chapterText)
      if (process.env.NODE_ENV === 'production' && chapterFrontmatter.draft) continue // skip the draft chapters
      const chapterTitle =
        chapterFrontmatter.title || chapterFilename.substring(chapterFilename.indexOf(' ') + 1).replace('.md', '')
      const chapterSlug = chapterFrontmatter.slug || slugify(chapterTitle, { lower: true, strict: true })
      const compiledMdx = await renderMDX(chapterText)
      let chapter = {
        title: chapterTitle,
        slug: chapterSlug,
        description: chapterFrontmatter.description || '',
        thumbnail: chapterFrontmatter.thumbnail || null,
        preview: chapterFrontmatter.preview || false, // free preview
        draft: chapterFrontmatter.draft || false,
        url: `/course/${courseDirName}/${section.slug}/${chapterSlug}`, // used in prev-next and TOC
        compiledMdx,
      }
      section.chapters.push(chapter)
    }
    // Don't add section if all chapters are drafts
    if (section.chapters.length > 0) sections.push(section)
  }
  // console.log(JSON.stringify(sections, null, 2))
  // console.log("NODE_ENV", process.env.NODE_ENV)
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
          url: chapter.url,
          draft: chapter.draft,
          preview: chapter.preview, // for "free preview" tag
        }
      }),
    }
  })
  const namedSections = {} // { "sectionSlug": { chapters: { "chapterSlug": ... }} }
  for (const section of sections) {
    let chapters = {}
    for (const chapter of section.chapters) {
      chapters[chapter.slug] = chapter
    }
    section.chapters = chapters
    namedSections[section.slug] = section
  }
  // console.log(JSON.stringify(sections, null, 2))
  // console.log('Generated Content', process.env.NODE_ENV)
  // writeFileSync(`${jsondir}/content.json`, JSON.stringify(content))
  // writeFileSync(`${jsondir}/toc.json`, JSON.stringify(toc))
  return { sections: namedSections, toc }
}

async function processLanding(courseDir) {
  const landingText = readFileSync(`${courseDir}/landing.md`, 'utf8')
  const frontmatter = parseFrontmatter(landingText)
  const copy = await renderMDX(landingText, false)
  // writeFileSync(`${jsondir}/copy.json`, JSON.stringify(copy))
  return { copy, frontmatter }
}

export async function processCourses() {
  const coursesDir = join(contentdir, 'courses')
  for (const courseDirName of readdirSync(coursesDir)) {
    const courseDirPath = join(coursesDir, courseDirName)
    if (!lstatSync(courseDirPath).isDirectory()) continue // ignore .DS_Store
    // console.log('courseDirPath', courseDirPath)
    const { sections, toc } = await processCourse(courseDirName)
    const { copy, frontmatter } = await processLanding(courseDirPath)
    const firstChapterUrl = `/course/${courseDirName}/${toc[0].slug}/${toc[0].chapters[0].slug}`
    const course = { sections, toc, copy, frontmatter, firstChapterUrl }
    writeFileSync(`${jsondir}/${courseDirName}.json`, JSON.stringify(course))
    console.log('[processCourses] Success! Markdown courses converted to json.')
  }
}

// processCourses()
// processCourse()
// processLanding()
