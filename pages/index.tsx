import Head from 'next/head'
import { MDXRemote } from 'next-mdx-remote'
import MDXComponents from 'components/Elements/MDXComponents'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'components/Elements/Link'
import { useModal } from 'context/ModalContext'
import Cookies from 'js-cookie'
import Subscribe from 'components/Layout/SubscribeBox'
import toc from 'backend/json/adventure-academy/toc.json'
import config from 'config.json'

export default function Landing({ copy, frontmatter, user }) {
  const { toggleModal } = useModal()
  const firstChapterUrl = `/${toc[0].slug}/${toc[0].chapters[0].slug}`
  // if (Cookies.get('token')) window.location.href = firstChapterUrl
  return (
    <>
      <div className="landing">
        <div className="cta-header">
          <h1>Adventure Writing Academy</h1>
          <h2>Learn to Create Awesome Adventures for Tabletop Roleplaying Games</h2>
          <div className="centered">
            {config.price === 0 || user ? (
              <Link href={firstChapterUrl} className="btn btn-cta-landing">
                Go To Course
                <FontAwesomeIcon icon={['fas', 'arrow-right']} />
              </Link>
            ) : (
              <>
                <div className="btn btn-cta-landing" onClick={() => toggleModal(`purchase`)}>
                  Start Learning Now! (${config.price})
                </div>
                <Link href={firstChapterUrl} className="btn btn-preview">
                  Free Course Preview
                </Link>
                <div className="btn btn-login" onClick={() => toggleModal(`login`)}>
                  Login
                </div>
              </>
            )}
          </div>
        </div>
        <div className="copy">
          <MDXRemote {...copy} components={MDXComponents} />
        </div>
      </div>
      {/* <Subscribe /> */}
    </>
  )
}

import { getUser } from 'pages/api/users/get-user'
import { join } from 'path'
import { readFileSync } from 'fs'
import { parseFrontmatter, renderMDX } from 'backend/json/mdx'
const contentdir = join(process.cwd(), 'content/adventure-academy')

export async function getServerSideProps({ req }) {
  const user = await getUser(req)
  const landingText = readFileSync(`${contentdir}/landing.md`, 'utf8')
  const frontmatter = parseFrontmatter(landingText)
  const copy = await renderMDX(landingText, false)
  return { props: { copy, frontmatter, user } }
}
