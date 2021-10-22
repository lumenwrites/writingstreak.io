import { serialize } from 'next-mdx-remote/serialize'
import matter from 'gray-matter' // Parse front-matter from a string or file
// Plugins
import rehypeSlug from 'rehype-slug' // adds id's to headers so you could link to them
import rehypeCodeTitles from 'rehype-code-titles' // allows you to show folder names above code blocks
import rehypeAutolinkHeadings from 'rehype-autolink-headings' // turns headers into links
import rehypePrism from 'rehype-prism-plus' // syntax highlighting, allows you to highlight code lines
import withToc from './remark/withTOC'

export function parseFrontmatter(source) {
  const { data } = matter(source)
  const frontmatter = {
    ...data,
    title: data.title || "",
    tags: data.tags || [],
    weight: data.weight || 0,
    courseSlug: "", // for typescript, set in getSSP
    chapterSlug: "",
    url: ""
  }
  return frontmatter
}

export async function renderMDX(text) {
  const { content, data } = matter(text)
  const toc = []
  const serialized = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [withToc(toc)],
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { properties: { className: ['header-link'] } }],
        rehypeCodeTitles,
        rehypePrism,
      ],
    },
    scope: data,
  })
  // console.log('source', serialized)
  // return { serialized, frontmatter: parseFrontmatter(text), toc }
  return serialized
}
