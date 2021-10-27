//@ts-nocheck
import slugify from 'slugify'
import { join } from 'path'
import { readFileSync, readdirSync, writeFileSync, lstatSync, existsSync } from 'fs'
import { parseFrontmatter, renderMDX } from './mdx.mjs'
const contentdir = "/Users/ray/Obsidian/Website/adventure-academy" // join(process.cwd(), 'content/adventure-academy')
// const jsondir = join(process.cwd(), './adventure-academy')
const jsondir = "/Users/ray/projects/adventureacademy/backend/json/adventure-academy"

export async function processContent() {
  let sections = []
  for (const dirName of readdirSync(contentdir)) {
    const sectionDirPath = join(contentdir, dirName)
    if (!lstatSync(sectionDirPath).isDirectory()) continue

    // Skip folders inside of the .ignore file
    if (existsSync(`${contentdir}/.ignore`)) {
      const ignoreText = readFileSync(`${contentdir}/.ignore`, 'utf8')
      const ignoreFolders = ignoreText.split('\n')
      if (ignoreFolders.includes(dirName)) continue
    }
      
    // Folder names start with a number, like 01, to conveniently order them in file system.
    // Remove numbers to generate section title, slugify it to generaet slug
    const dirTitle = dirName.substring(dirName.indexOf(" ") + 1)
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
      const chapterTitle = chapterFrontmatter.title || chapterFilename.substring(chapterFilename.indexOf(" ") + 1).replace(".md", "")
      const chapterSlug = chapterFrontmatter.slug || slugify(chapterTitle, { lower: true, strict: true })
      const compiledMdx = await renderMDX(chapterText)
      let chapter = {
        title: chapterTitle,
        slug: chapterSlug,
        description: chapterFrontmatter.description || "",
        thumbnail: chapterFrontmatter.thumbnail || null,
        preview: chapterFrontmatter.preview || false, // free preview
        draft: chapterFrontmatter.draft || false,
        url: `/${section.slug}/${chapterSlug}`, // used in prev-next and TOC
        compiledMdx
      }
      section.chapters.push(chapter)
    }
    sections.push(section)
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
          preview: chapter.preview // for "free preview" tag
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
  console.log("Generated Content", process.env.NODE_ENV)
  writeFileSync(`${jsondir}/content.json`, JSON.stringify(content))
  writeFileSync(`${jsondir}/toc.json`, JSON.stringify(toc))
  return { content, toc }
}

processContent()
