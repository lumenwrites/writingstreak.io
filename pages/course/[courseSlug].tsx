import Head from 'next/head'
import { MDXRemote } from 'next-mdx-remote'
import MDXComponents from 'components/Elements/MDXComponents'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'components/Elements/Link'
import { useModal } from 'context/ModalContext'
import Layout from 'components/Layout/Layout'
import Cookies from 'js-cookie'
import Subscribe from 'components/Layout/SubscribeBox'
import config from 'config.json'

// https://stripe.com/docs/stripe-js/react#elements-provider
import PurchaseModal from 'components/Users/PurchaseModal'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_CLIENT_SECRET)

export default function Landing({ course, user }) {
  const { toggleModal } = useModal()
  // if (Cookies.get('token')) window.location.href = firstChapterUrl
  return (
    <Layout>
      <div className="landing">
        <div className="cta-header">
          <h1>Adventure Writing Academy</h1>
          <h2>Learn to Create Awesome Adventures for Tabletop Roleplaying Games</h2>
          <div className="centered">
            {config.price === 0 || user ? (
              <Link href={course.firstChapterUrl} className="btn btn-cta-landing">
                Go To Course
                <FontAwesomeIcon icon={['fas', 'arrow-right']} />
              </Link>
            ) : (
              <>
                <div className="btn btn-cta-landing" onClick={() => toggleModal(`purchase`)}>
                  Start Learning Now! (${config.price})
                </div>
                <Link href={course.firstChapterUrl} className="btn btn-preview">
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
          <MDXRemote {...course.copy} components={MDXComponents} />
        </div>
        <footer>
          <div className="center-text">
            {config.price === 0 || user ? (
              <Link href={course.firstChapterUrl} className="btn btn-cta-landing">
                Go To Course
                <FontAwesomeIcon icon={['fas', 'arrow-right']} />
              </Link>
            ) : (
              <>
                <div className="btn btn-cta-landing" onClick={() => toggleModal(`purchase`)}>
                  Start Learning Now! (${config.price})
                </div>
                <Link href={course.firstChapterUrl} className="btn btn-preview">
                  Free Course Preview
                </Link>
              </>
            )}
          </div>
        </footer>
      </div>
      <Elements stripe={stripePromise}>
        <PurchaseModal successLink={course.firstChapterUrl} />
      </Elements>
      {/* <Subscribe /> */}
    </Layout>
  )
}

import { getUser } from 'pages/api/users/get-user'
import content from 'backend/json/content'

export async function getServerSideProps({ params, req }) {
  const user = await getUser(req)
  const course = content.courses[params.courseSlug]
  return { props: { course, user } }
}
