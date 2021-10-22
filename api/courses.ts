import { join } from 'path'
import { readFileSync, readdirSync } from 'fs'
import { parseFrontmatter, renderMDX } from './mdx'

const basedir = join(process.cwd(), 'content', 'course')

export function getAllCourses() {
  const courseDirs = readdirSync(basedir)
  const courses = courseDirs.map((dirname) => {
    const text = readFileSync(join(basedir, dirname, '_index.md'), 'utf8')
    const frontmatter = parseFrontmatter(text)
    const slug = dirname
    const url = `/course/${slug}`
    return { ...frontmatter, slug, url }
  })
  return courses
}

// TODO: try to combine [chapterSlug] and index into one
// probably not here, it's gotta be one page.
// export async function getCourse({ courseSlug, chapterSlug }) {
//   let postFilePath = join(basedir, `${courseSlug}/_index.mdx`)
//   if (chapterSlug) postFilePath = join(basedir, `${courseSlug}/${chapterSlug}.mdx`)
//   const postText = readFileSync(postFilePath)
//   const post = await renderMDX(postText) // { serialized, frontmatter, toc }
//   const chapters = getChapters(courseSlug)
//   return { post, chapters }
// }

export function getChapters(courseSlug) {
  const chapterFileNames = readdirSync(join(basedir, courseSlug))
  const chapters = chapterFileNames.map((chapterFileName) => {
    const chapterFilePath = join(basedir, `${courseSlug}/${chapterFileName}`)
    const chapterText = readFileSync(chapterFilePath)
    const frontmatter = parseFrontmatter(chapterText)
    let chapterSlug = chapterFileName.replace('.md', '')
    let url = `/course/${courseSlug}/${chapterSlug}`
    if (chapterFileName === '_index.md') {
      chapterSlug = ''
      url = `/course/${courseSlug}`
    }
    const customFrontmatter = {
      title: frontmatter.title,
      weight: frontmatter.weight,
      courseSlug,
      chapterSlug,
      url
    }
    return customFrontmatter
  })
  const chaptersOrdered = chapters.sort(function (a, b) {
    return a.weight - b.weight
  })
  return chaptersOrdered
}


// export async function getCourse(slug) {
//   console.log('getCourse', slug)
//   const chapters = readdirSync(join(contentdir, `/course/${slug}`))
//   console.log('chapters', chapters)
//   const text = readFileSync(join(contentdir, `/course/${slug}/_index.mdx`), 'utf8')
//   const renderedMDX = await renderMDX(text)
//   return { ...renderedMDX, chapters }
// }
