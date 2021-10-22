import { getPosts, getAllTags } from 'api/posts'
import Link from 'components/Elements/Link'
import Layout from "components/Layout/Layout"
import Browse from "components/Posts/Browse"
import SubscribeBox from 'components/Layout/SubscribeBox'

export default function index({ posts }) {
  return (
    <Layout>
      <Browse posts={posts} />
      <SubscribeBox/>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  // console.log('tag page', params)
  const posts = await getPosts({ tag: params.tagSlug })
  // console.log(posts)
  return { props: { posts } }
}

export async function getStaticPaths() {
  const allTags = getAllTags()
  console.log('allTags', allTags)
  return {
    paths: allTags.map((tag) => ({
      params: { tagSlug: tag },
    })),
    fallback: false,
  }
}
