import {unified} from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import rehypeSlug from 'rehype-slug' // adds id's to headers so you could link to them
import rehypeCodeTitles from 'rehype-code-titles' // allows you to show folder names above code blocks
import rehypeAutolinkHeadings from 'rehype-autolink-headings' // turns headers into links
import rehypePrism from 'rehype-prism-plus' // syntax highlighting, allows you to highlight code lines


export async function markdownToHtml(markdown) {
  // console.log(`Processing markdown ${markdown}`)
  const html = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeCodeTitles)
    // .use(rehypeAutolinkHeadings)
    .use(rehypePrism)
    // .use(rehypeSanitize)
    .use(rehypeStringify)
    .process(markdown)
  // console.log("Rendered markdown to html", html)
  return html.value.toString()
}
