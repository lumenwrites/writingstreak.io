import { serialize } from 'next-mdx-remote/serialize'
import matter from 'gray-matter' // Parse front-matter from a string or file
// Plugins
import rehypeSlug from 'rehype-slug' // adds id's to headers so you could link to them
import rehypeCodeTitles from 'rehype-code-titles' // allows you to show folder names above code blocks
import rehypeAutolinkHeadings from 'rehype-autolink-headings' // turns headers into links
import rehypePrism from 'rehype-prism-plus' // syntax highlighting, allows you to highlight code lines

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

export async function renderMDX(text, doLinkHeadings=true) {
  const { content, data } = matter(text)
  const toc = []
  let remarkPlugins = [
    // withToc(toc)
  ]
  let rehypePlugins = [
    rehypeSlug,
    rehypeCodeTitles,
    rehypePrism,
  ]
  // if (doLinkHeadings) {
  //   const autolinkPlugin = [rehypeAutolinkHeadings, { properties: { className: ['header-link'] } }]
  //   rehypePlugins.push(autolinkPlugin)
  // }

  const serialized = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: { remarkPlugins, rehypePlugins },
    scope: data,
  })
  // console.log('source', serialized)
  // return { serialized, frontmatter: parseFrontmatter(text), toc }
  return serialized
}

import slugify from '@sindresorhus/slugify'

/**
 * Generates a table of contents by parsing a node tree
 * @param [toc] An array to push table contents to.
 */
const withTableofContents = (toc?: any[]) => {
  return () => (tree) => {
    // @ts-ignore
    for (let i = 0; i < tree.children.length; i++) {
      const node = tree.children[i]
      if (node.type === 'heading' && [2, 3].includes(node.depth)) {
        const children = node.children.filter((n) => ['text', 'inlineCode'].includes(n.type))

        const title = children
          .map((n) =>
            n.type === 'inlineCode'
              ? // Cleanup links for code-only titles
                n.value.replace(/^(get|set)\s|\(.+|\??\:.+/g, '')
              : n.value
          )
          .join('')
        const slug = slugify(title)

        const content = children
          .map((n) => (n.type === 'text' ? n.value : `<${n.type}>{'${n.value}'}</${n.type}>`))
          .join('')
        node.type = 'jsx'
        node.value = `<Heading id={"${slug}"} level={${node.depth}}>${content}</Heading>`

        if (Array.isArray(toc)) {
          toc.push({ slug, title, depth: node.depth })
        }
      }
    }

    return tree
  }
}
