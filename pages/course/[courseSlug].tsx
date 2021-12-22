import Head from 'next/head'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'components/Elements/Link'
import { useModal } from 'context/ModalContext'
import Layout from 'components/Layout/Layout'
import config from 'config.json'

export default function Landing({ course, user }) {
  const { toggleModal } = useModal()
  return (
    <Layout>
      <div className="landing">
        <div className="cta-header">
          <h1>{course.frontmatter.title}</h1>
          <h2>{course.frontmatter.description}</h2>
          <div className="centered">
            {user ? (
              <Link href={course.firstChapterUrl} className="btn btn-cta-landing">
                Go To Course
                <FontAwesomeIcon icon={['fas', 'arrow-right']} />
              </Link>
            ) : (
              <button className="btn btn-cta-landing" onClick={() => toggleModal('login')}>
                Get Started For Free
                <FontAwesomeIcon icon={['fas', 'arrow-right']} />
              </button>
            )}
          </div>
        </div>
        <div className="copy text">
          <div dangerouslySetInnerHTML={{ __html: course.copy }} />
        </div>
        <footer>
          <div className="center-text">
            <div className="centered">
              {user ? (
                <Link href={course.firstChapterUrl} className="btn btn-cta-landing">
                  Go To Course
                  <FontAwesomeIcon icon={['fas', 'arrow-right']} />
                </Link>
              ) : (
                <button className="btn btn-cta-landing" onClick={() => toggleModal('login')}>
                  Get Started For Free
                  <FontAwesomeIcon icon={['fas', 'arrow-right']} />
                </button>
              )}
            </div>
          </div>
        </footer>
      </div>
      <Head>
        <title>
          {course.frontmatter.title} | {config.title}
        </title>
        <meta property="og:title" content={`${course.frontmatter.title} | ${config.title}`} key="ogtitle" />
        <meta property="og:description" content={course.frontmatter.description} key="ogdesc" />
        <meta name="twitter:description" content={course.frontmatter.description} />
        {course.frontmatter.thumbnail && (
          <>
            <meta property="og:image" content={`${config.domain}${course.frontmatter.thumbnail}`} key="ogimage" />
            <meta name="twitter:image" content={`${config.domain}${course.frontmatter.thumbnail}`} />
          </>
        )}
      </Head>
      {/* <Subscribe /> */}
    </Layout>
  )
}

import { getUser } from 'prisma/api/users/get-user'
import course from 'backend/json/courses/novice-to-prolific.json'

export async function getServerSideProps({ params, req }) {
  const user = await getUser(req)
  return { props: { course, user } }
}
