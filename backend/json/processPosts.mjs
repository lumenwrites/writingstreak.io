import slugify from 'slugify'
import { join } from 'path'
import { readFileSync, readdirSync, writeFileSync } from 'fs'
import { parseFrontmatter, renderMDX } from './mdx.mjs'
import config from '../../config.json'

const postsdir = join(config.contentdir, 'posts')
const jsondir = join(process.cwd(), './backend/json/posts')

export async function getPosts() {
  let posts = []
  for (const postFileName of readdirSync(postsdir)) {
    const postText = readFileSync(join(postsdir, postFileName), 'utf8')
    const frontmatter = parseFrontmatter(postText)
    if (frontmatter.draft) continue // skip drafts 
    
    const title = frontmatter.title || postFileName.substring(postFileName.indexOf(' ') + 1).replace('.md', '')
    const slug = frontmatter.slug || slugify(title, { lower: true, strict: true })
    const url = frontmatter.directLink || `/post/${slug}`
    const tags = frontmatter.tags.map(tag => ({
      name: tag,
      slug:slugify(tag, { lower: true })
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
      compiledMdx
    }
    // console.log(post)
    posts.push(post)
  }
  return posts
}

async function processPosts() {
  const posts = await getPosts()
  writeFileSync(`${jsondir}/posts.json`, JSON.stringify(posts))
}

processPosts()
