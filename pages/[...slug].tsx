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

export default function Page({ chapter, sections, user }) {
  return (
    <Layout sidebarChildren={<Chapters sections={sections} />}>
      {user ? (
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
        {/* <meta property="og:description" content={chapter.description} key="ogdesc" />
          <meta name="twitter:description" content={post.frontmatter.description} />
          {post.frontmatter.thumbnail && (
            <>
              <meta property="og:image" content={`${config.domain}${post.frontmatter.thumbnail}`} key="ogimage" />
              <meta name="twitter:image" content={`${config.domain}${post.frontmatter.thumbnail}`} />
            </>
          )} */}
      </Head>
    </Layout>
  )
}

import { processContent } from 'backend/processContent'
import toc from 'toc.json'
import content from 'content.json'

export async function getServerSideProps({ params, req }) {
  await processContent()
  const [sectionSlug, chapterSlug] = params.slug
  const user = true // await getUser(req)
  const chapter = content[sectionSlug].chapters[chapterSlug]
  return { props: { chapter, sections: toc, user } }
}

// export async function getStaticPaths() {
//   let allPaths = []
//   getSections().map((section) => {
//     section.chapters.map((chapter) => {
//       // console.log(section.slug, chapter.slug)
//       allPaths.push({ params: { slug: [section.slug, chapter.slug] } })
//     })
//   })
//   // console.log(JSON.stringify(allPaths, null, 2))
//   return {
//     paths: allPaths,
//     fallback: false,
//   }
// }
