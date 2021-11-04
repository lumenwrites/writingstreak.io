import slugify from 'slugify'
import { join } from 'path'
import { readFileSync, readdirSync, writeFileSync } from 'fs'
import { parseFrontmatter, renderMDX } from './mdx.mjs'
import config from '../../config.json'

export async function getPosts(postsdir) {
  let posts = []
  for (const postFileName of readdirSync(postsdir)) {
    const postText = readFileSync(join(postsdir, postFileName), 'utf8')
    const frontmatter = parseFrontmatter(postText)
    if (frontmatter.draft) continue // skip drafts

    const title = frontmatter.title || postFileName.substring(postFileName.indexOf(' ') + 1).replace('.md', '')
    const slug = frontmatter.slug || slugify(title, { lower: true, strict: true })
    const url = frontmatter.directLink || `/post/${slug}`
    const tags = frontmatter.tags.map((tag) => ({
      name: tag,
      slug: slugify(tag, { lower: true }),
    }))
    const compiledMdx = await renderMDX(postText)
    const post = {
      title,
      slug,
      url,
      tags,
      description: frontmatter.description || '',
      thumbnail: frontmatter.thumbnail || null,
      draft: frontmatter.draft || false,
      compiledMdx,
    }
    posts.push(post)
    console.log('[processPosts] processed:', post.title)
  }
  return posts
}

export async function processPosts() {
  const postsdir = join(config.contentdir, 'posts')
  const jsondir = join(process.cwd(), './backend/json/posts')
  const posts = await getPosts(postsdir)
  writeFileSync(`${jsondir}/posts.json`, JSON.stringify(posts))
  console.log('[processPosts] Success! Markdown posts converted to json.')
}

export async function processPages() {
  const pagesdir = join(config.contentdir, 'pages')
  const jsondir = join(process.cwd(), './backend/json/pages')
  const posts = await getPosts(pagesdir)
  writeFileSync(`${jsondir}/pages.json`, JSON.stringify(posts))
  console.log('[processPosts] Success! Markdown pages converted to json.')
}

//processPosts()
