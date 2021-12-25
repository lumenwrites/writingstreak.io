import Head from 'next/head'
import Link from 'components/Elements/Link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useModal } from 'context/ModalContext'
import Layout from 'components/Layout/Layout'
import config from 'config.json'

export default function Landing({ copy }) {
  return (
    <Layout>
      <div className="landing">
        <div className="cta-header">
          <h1>Become a Prolific Writer</h1>
          <h2>
            This very simple but powerful tool will help you to:
            <ul>
              <li>Develop a daily writing habit</li>
              <li>Massively increase your writing output</li>
              <li>Master the art of writing in a fun and engaging way</li>
            </ul>
          </h2>

          {/* <h2>
            Writing Streak is a simple but powerful tool that will help you to master the art of writing in a fun and
            engaging way
            <ul>
              <li>Overcome writer's block</li>
              <li>Develop a daily writing habit</li>
              <li>Massively increase your writing output</li>
              <li>Overcome the writer's block and never run out of ideas</li>
              <li>Share your work with the community of writers and receive feedback</li>
            </ul>
            </h2> */}
          <SignupCTA />
        </div>

        <div className="copy text" dangerouslySetInnerHTML={{ __html: copy.body }} />

        <footer>
          <SignupCTA />
        </footer>
      </div>
      <Head>
        <title>{config.title}</title>
        <meta property="og:title" content={`${config.title}`} key="ogtitle" />
        <meta name="description" content={config.description} />
        <meta property="og:description" content={config.description} key="ogdesc" />
        <meta name="twitter:description" content={config.description} />
        <meta property="og:image" content={`${config.socialImage}`} key="ogimage" />
        <meta name="twitter:image" content={`${config.socialImage}`} />
      </Head>
      {/* <Subscribe /> */}
    </Layout>
  )
}

function SignupCTA() {
  const { toggleModal } = useModal()
  return (
    <div className="centered">
      <div className="btn btn-cta-landing" onClick={() => toggleModal(`login`)}>
        Get started for Free
        {/* Try it for free. (First 30 days are Free). */}
      </div>
      {/* <div className="btn btn-login" onClick={() => toggleModal(`login`)}>
        Login
      </div> */}
    </div>
  )
}
