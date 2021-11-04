//@ts-nocheck
import Head from 'next/head'
import Link from 'components/Elements/Link'
import { MDXRemote } from 'next-mdx-remote'
import MDXComponents from 'components/Elements/MDXComponents'
import { useModal } from 'context/ModalContext'
import LayoutSidebar from 'components/Layout/LayoutSidebar'
import PrevNext from 'components/Posts/PrevNext'
import Chapters from 'components/Posts/Chapters'
import config from 'config.json'

// https://stripe.com/docs/stripe-js/react#elements-provider
import PurchaseModal from 'components/Users/PurchaseModal'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_CLIENT_SECRET)

export default function Page({ chapter, toc, user, firstChapterUrl }) {
  return (
    <LayoutSidebar sidebarChildren={<Chapters sections={toc} user={user} />}>
      {user || chapter.preview || config.price === 0 ? (
        <div className="post chapter">
          <MDXRemote {...chapter.compiledMdx} components={MDXComponents} />
          <PrevNext post={chapter} />
        </div>
      ) : (
          <Paywall firstChapterUrl={firstChapterUrl} />
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
    </LayoutSidebar>
  )
}

function Paywall({firstChapterUrl}) {
  const { toggleModal } = useModal()
  return (
    <div className="post">
      <div className="content-locked">
        <p>You need to purchase the course to view this content.</p>
        <p>If you&apos;re already enrolled, you&apos;ll need to login.</p>
        <div className="btn btn-cta-landing" onClick={() => toggleModal(`purchase`)}>
          Start Learning Now! (${config.price})
        </div>
        <div className="btn btn-login" onClick={() => toggleModal(`login`)}>
          Login
        </div>
      </div>
      <Elements stripe={stripePromise}>
        <PurchaseModal successLink={firstChapterUrl} />
      </Elements>
    </div>
  )
}

import { getUser } from 'pages/api/users/get-user'
import content from 'backend/json/content'

export async function getServerSideProps({ params, req }) {
  const [courseSlug, sectionSlug, chapterSlug] = params.slug
  // console.log('slug', params.slug)
  const user = await getUser(req)
  const { toc, sections, firstChapterUrl } = content.courses[courseSlug]
  const chapter = sections[sectionSlug].chapters[chapterSlug]
  return { props: { chapter, toc, user, firstChapterUrl } }
}
