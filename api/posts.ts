// @ts-nocheck
// https://leerob.io/blog/mdx
// https://github.com/leerob/leerob.io/blob/main/lib/mdx.js
import { join } from 'path'
import { readFileSync, readdirSync } from 'fs'
import slugify from 'slugify'

import { parseFrontmatter, renderMDX } from './mdx'

const contentdir = join(process.cwd(), 'content')

export function getPosts(args = { tag: '' }) {
  const filenames = readdirSync(join(contentdir, 'post'))
  let posts = filenames.map((filename) => {
    const source = readFileSync(join(contentdir, 'post', filename), 'utf8')
    const frontmatter = parseFrontmatter(source)
    const slug = filename.replace('.md', '')
    const url = `/post/${slug}`
    return { ...frontmatter, slug, url }
  })
  if (args.tag) {
    posts = posts.filter(({ tags }) => {
      const slugifiedTags = tags.map(tag => slugify(tag, { lower: true }))
      return slugifiedTags.includes(args.tag)
    })
  }
  posts = posts.sort((a, b) => a.weight - b.weight)
  posts = posts.filter((post) => !post.draft)
  return posts
}

export function getAllTags() {
  const posts = getPosts()
  const allTags = posts.reduce((allTags, { tags }) => allTags.concat(tags), [])
  const slugifiedTags = allTags.map(tag => slugify(tag, { lower: true }))
  const uniqueTags = [...new Set(slugifiedTags)]
  // console.log('allTags', uniqueTags)
  return uniqueTags
}
