import matter from 'gray-matter'
import slugify from 'slugify'
import { join } from 'path'
import { readFileSync, readdirSync, writeFileSync } from 'fs'
import config from '../../config.json'
import { markdownToHtml } from './markdown.mjs'
 
export async function getPosts(postsdir) {
  let posts = []
  for (const postFileName of readdirSync(postsdir)) {
    // console.log('Processing Post', postFileName)
    const postText = readFileSync(join(postsdir, postFileName), 'utf8')
    const { data: frontmatter, content } = matter(postText)
    if (frontmatter.draft) continue // skip drafts
    if (!postFileName.includes('.md')) continue // skip .DS_Store
    let titleFromFilename = postFileName.replace('.md', '')
    // If the file name starts with a number (like 999, used for ordering), remove it
    if (!isNaN(parseInt(titleFromFilename.split(' ')[0]))) {
      titleFromFilename = titleFromFilename.substring(postFileName.indexOf(' ') + 1)
    }
    const title = frontmatter.title || titleFromFilename
    const slug = frontmatter.slug || slugify(title, { lower: true, strict: true })
    const url = frontmatter.directLink || `/post/${slug}`
    let tags = frontmatter.tags?.map((tag) => ({
      name: tag,
      slug: slugify(tag, { lower: true }),
    }))
    const post = {
      title,
      slug,
      url,
      tags: tags || [],
      description: frontmatter.description || '',
      thumbnail: frontmatter.thumbnail || null,
      social: frontmatter.social || frontmatter.thumbnail || null,
      comments: frontmatter.comments || null,
      relatedPosts: frontmatter.relatedPosts || null,
      body: await markdownToHtml(content),
    }
    posts.push(post)
    console.log('Processed post:', post.title)
  }

  return posts
}

export async function processPosts() {
  const postsdir = join(config.contentdir, 'posts')
  const jsondir = join(process.cwd(), './backend/json/out')
  const posts = await getPosts(postsdir)
  // posts.map((post) => console.log(post.title, post.draft))
  writeFileSync(`${jsondir}/posts.json`, JSON.stringify(posts, null, 2))
  console.log('[processPosts] Success! Markdown posts converted to json.')
}

export async function processPages() {
  const pagesdir = join(config.contentdir, 'pages')
  const jsondir = join(process.cwd(), './backend/json/out')
  const posts = await getPosts(pagesdir)
  writeFileSync(`${jsondir}/pages.json`, JSON.stringify(posts))
  console.log('[processPosts] Success! Markdown pages converted to json.')
}

await processPosts()
await processPages()
