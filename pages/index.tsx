import Head from 'next/head'
import { MDXRemote } from 'next-mdx-remote'
import MDXComponents from 'components/Elements/MDXComponents'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'components/Elements/Link'
import Layout from 'components/Layout/Layout'

export default function index({ copy, frontmatter }) {
  // console.log(frontmatter)
  return (
    <>
      <div className="landing">
        <div className="cta-header">
          <h1>Adventure Writing Academy</h1>
          <h2>Learn to Create Awesome Adventures for Tabletop Roleplaying Games</h2>
          <div className="centered">
            <Link href={frontmatter.ctaLink} className="btn btn-cta-landing">
              Start Learning Now!
            </Link>
          </div>
        </div>

        <div className="copy">
          <MDXRemote {...copy} components={MDXComponents} />
        </div>
      </div>
      <Head>
        <title>Adventure Academy</title>
      </Head>
    </>
  )
}

import { join } from 'path'
import { readFileSync } from 'fs'
import { parseFrontmatter, renderMDX } from 'api/mdx'
const contentdir = join(process.cwd(), 'content')

export async function getStaticProps() {
  const landingText = readFileSync(`${contentdir}/landing.md`, 'utf8')
  const frontmatter = parseFrontmatter(landingText)
  const copy = await renderMDX(landingText, false)
  return { props: { copy, frontmatter } }
}