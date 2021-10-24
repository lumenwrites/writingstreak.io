//@ts-nocheck
import Head from 'next/head'
import Link from 'components/Elements/Link'
import { MDXRemote } from 'next-mdx-remote'
import MDXComponents from 'components/Elements/MDXComponents'
import Layout from 'components/Layout/Layout'
import PrevNext from 'components/Posts/PrevNext'
import Chapters from 'components/Posts/Chapters'
import config from 'config.json'
import { useModal } from 'context/ModalContext'

function Paywall() {
  const { toggleModal } = useModal()
  return (
    <div className="post">
      <div className="content-locked">
        <p>You need to purchase the course to view this content.</p>
        <p>If you&apos;re already enrolled, you&apos;ll need to login.</p>
        <div className="btn btn-cta-landing" onClick={() => toggleModal(`purchase`)}>
          Start Learning Now! ($20)
        </div>
        <div className="btn btn-login" onClick={() => toggleModal(`login`)}>
          Login
        </div>
      </div>
    </div>
  )
}

export default function Page({ chapter, toc, user }) {
  return (
    <Layout sidebarChildren={<Chapters sections={toc} user={user} />}>
      {user || chapter.preview ? (
        <div className="post">
          <MDXRemote {...chapter.compiledMdx} components={MDXComponents} />
          <PrevNext post={chapter} />
        </div>
      ) : (
        <Paywall />
      )}
      <Head>
        <title>
          {chapter.title} | {config.title}
        </title>
        <meta property="og:title" content={`${chapter.title} | ${config.title}`} key="ogtitle" />
        {chapter.description && (
          <>
            <meta property="og:description" content={chapter.description} key="ogdesc" />
            <meta name="twitter:description" content={chapter.description} />
          </>
        )}
        {chapter.thumbnail && (
          <>
            <meta property="og:image" content={`${config.domain}${chapter.thumbnail}`} key="ogimage" />
            <meta name="twitter:image" content={`${config.domain}${chapter.thumbnail}`} />
          </>
        )}
      </Head>
    </Layout>
  )
}

import { getUser } from '/pages/api/users/get-user'
import { processContent } from 'backend/json/processContent'
import courses from 'backend/json/courses'

export async function getServerSideProps({ params, req }) {
  const [sectionSlug, chapterSlug] = params.slug
  const user = await getUser(req)

  if (process.env.NODE_ENV === 'development') {
    // regenerate content if I'm in dev
    const { content, toc } = await processContent()
    const chapter = content[sectionSlug].chapters[chapterSlug]
    return { props: { chapter, toc, user } }
  }

  const { toc, content } = courses['adventure-academy']
  const chapter = content[sectionSlug].chapters[chapterSlug]
  return { props: { chapter, toc, user } }
}
