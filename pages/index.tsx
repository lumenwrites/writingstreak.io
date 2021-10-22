import Head from 'next/head'
import { MDXRemote } from 'next-mdx-remote'
import MDXComponents from 'components/Elements/MDXComponents'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'components/Elements/Link'
import PurchaseModal from 'components/Users/PurchaseModal'
import LoginModal from 'components/Users/LoginModal'

// https://stripe.com/docs/stripe-js/react#elements-provider
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_CLIENT_SECRET)

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
              Start Learning Now! ($20)
            </Link>
            <div className="btn btn-login">
              Login
            </div>
          </div>
        </div>
        <div className="copy">
          <MDXRemote {...copy} components={MDXComponents} />
        </div>
      </div>
      <Elements stripe={stripePromise}>
        <PurchaseModal />
      </Elements>
      <LoginModal/>
      <Head>
        <title>Adventure Academy</title>
        {/* Take social meta from frontmatter. */}
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
