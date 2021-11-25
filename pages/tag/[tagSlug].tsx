import Layout from 'components/Layout/Layout'
import PostFeed from 'components/Posts/PostFeed'
import AdBoxes from 'components/Layout/AdBoxes'

export default function browse({ posts }) {
  return (
    <Layout>
      <PostFeed posts={posts} />
      {/* <AdBoxes /> */}
      <br/>
    </Layout>
  )
}

import posts from 'backend/json/out/posts.json'

export async function getStaticProps({ params }) {
  const filteredPosts = posts.filter(({ tags }) => {
    return tags.find((tag) => tag.slug === params.tagSlug)
  })
  return { props: { posts: filteredPosts } }
}

export async function getStaticPaths() {
  let allTagSlugs = []
  posts.map((post) => {
    post.tags.map((tag) => {
      if (!allTagSlugs.includes(tag.slug)) {
        allTagSlugs.push(tag.slug)
      }
    })
  })
  return {
    paths: allTagSlugs.map((tagSlug) => ({
      params: { tagSlug },
    })),
    fallback: false,
  }
}
