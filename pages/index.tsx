import Head from 'next/head'
import { MDXRemote } from 'next-mdx-remote'
import MDXComponents from 'components/Elements/MDXComponents'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'components/Elements/Link'
import { useModal } from 'context/ModalContext'
import Cookies from 'js-cookie'
import toc from 'toc.json'

export default function Landing({ copy, frontmatter }) {
  const { toggleModal } = useModal()
  const firstChapterUrl = `/${toc[0].slug}/${toc[0].chapters[0].slug}`
  if (Cookies.get('token')) window.location.href = firstChapterUrl
  return (
    <>
      <div className="landing">
        <div className="cta-header">
          <h1>Adventure Writing Academy</h1>
          <h2>Learn to Create Awesome Adventures for Tabletop Roleplaying Games</h2>
          <div className="centered">
            <div className="btn btn-cta-landing" onClick={() => toggleModal(`purchase`)}>
              Start Learning Now! ($20)
            </div>
            <div className="btn btn-login" onClick={() => toggleModal(`login`)}>
              Login
            </div>
          </div>
        </div>
        <div className="copy">
          <MDXRemote {...copy} components={MDXComponents} />
        </div>
      </div>
      <Head>
        <title>Adventure Academy</title>
        {/* Take social meta from frontmatter. */}
      </Head>
    </>
  )
}

import { join } from 'path'
import { readFileSync } from 'fs'
import { parseFrontmatter, renderMDX } from 'backend/mdx'
const contentdir = join(process.cwd(), 'content')

export async function getStaticProps() {
  const landingText = readFileSync(`${contentdir}/landing.md`, 'utf8')
  const frontmatter = parseFrontmatter(landingText)
  const copy = await renderMDX(landingText, false)
  return { props: { copy, frontmatter } }
}
