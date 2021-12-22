//@ts-nocheck
import Head from 'next/head'
import Link from 'components/Elements/Link'
import { useModal } from 'context/ModalContext'
import CourseLayout from 'components/Courses/CourseLayout'
import PrevNext from 'components/Courses/PrevNext'
import Chapters from 'components/Courses/Chapters'
import config from 'config.json'

export default function Page({ chapter, toc, user, firstChapterUrl }) {
  return (
    <CourseLayout sidebarChildren={<Chapters sections={toc} user={user} />}>
      {user || chapter.preview || config.price === 0 ? (
        <div className="course-chapter text">
          <div dangerouslySetInnerHTML={{ __html: chapter.body }} />
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
    </CourseLayout>
  )
}

function Paywall({ firstChapterUrl }) {
  const { toggleModal } = useModal()
  return (
    <div className="course-chapter text">
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
    </div>
  )
}

import { getUser } from 'prisma/api/users/get-user'
import course from 'backend/json/courses/novice-to-prolific.json'

export async function getServerSideProps({ params, req }) {
  const [courseSlug, sectionSlug, chapterSlug] = params.slug
  // console.log('slug', params.slug)
  const user = await getUser(req)
  const { toc, sections, firstChapterUrl } = course
  const chapter = sections[sectionSlug].chapters[chapterSlug]
  return { props: { chapter, toc, user, firstChapterUrl } }
}
