import Link from 'components/Elements/Link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { MDXRemote } from 'next-mdx-remote'
import Head from 'next/head'
import Layout from 'components/Layout/Layout'
import SubscribeBox from 'components/Layout/SubscribeBox'
import AdBoxes from 'components/Layout/AdBoxes'
import MDXComponents from 'components/Elements/MDXComponents'
import config from 'config.json'

export default function Post({ post }) {
  return (
    <Layout>
      <div className="post blog-post">
        <MDXRemote {...post.compiledMdx} components={MDXComponents} />
        {/* Footer */}
        {post.tags.length ? (
          <div className="post-footer">
            <div className="tags">
              {post.tags.map((tag) => (
                <Link className="tag" key={tag.slug} href={`/tag/${tag.slug}`}>
                  {tag.name}
                </Link>
              ))}
              {post.draft && <div className="tag draft">Draft</div>}
              {post.comments && (
                <a href={post.comments} className="tag comments">
                  <FontAwesomeIcon icon={['fas', 'comment-alt']} />
                  Comments
                </a>
              )}
              <div className="clearfix" />
            </div>
          </div>
        ) : null}
        {/* <CourseCTA/> */}
        <Head>
          <title>
            {post.title}
          </title>
          <meta property="og:title" content={`${post.title}`} key="ogtitle" />
          <meta name="twitter:title" content={`${post.title}`} key="ogtitle" />
          <meta property="og:description" content={post.description} key="ogdesc" />
          <meta name="twitter:description" content={post.description} />
          {post.social && <meta property="og:image" content={`${config.domain}${post.social}`} key="ogimage" />}
          {post.social && <meta name="twitter:image" content={`${config.domain}${post.social}`} />}
        </Head>
      </div>
      {/* <AdBoxes /> */}
      <SubscribeBox />
      <br />
    </Layout>
  )
}

import posts from 'backend/json/posts/posts.json'

export async function getStaticProps({ params }) {
  const post = posts.find((post) => post.slug == params.postSlug)
  return { props: { post } }
}

export async function getStaticPaths() {
  return {
    paths: posts.map((post) => ({
      params: { postSlug: post.slug },
    })),
    fallback: false,
  }
}
