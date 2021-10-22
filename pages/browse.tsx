import { getPosts } from 'api/posts'
import Link from 'components/Elements/Link'
import Layout from "components/Layout/Layout"
import Browse from "components/Posts/Browse"
import SubscribeBox from 'components/Layout/SubscribeBox'

export default function browse({ posts }) {
  return (
    <Layout>
      <Browse posts={posts} />
      <SubscribeBox/>
    </Layout>
  )
}

export async function getStaticProps() {
  const posts = await getPosts()
  // console.log(posts)
  return { props: { posts } }
}
