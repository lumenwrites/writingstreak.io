import dynamic from 'next/dynamic'
import Layout from 'components/Layout/Layout'

// import TipTap from 'components/Editor/TipTap'
// https://nextjs.org/docs/advanced-features/dynamic-import#with-no-ssr
const TipTapNoSSR = dynamic(() => import('../../../components/Editor/TipTap'), { ssr: false })

export default function Home({ post }) {
  return (
    <Layout>
      <TipTapNoSSR post={post}/>
    </Layout>
  )
}

import { getPost } from 'prisma/api/posts/get-post'

export async function getServerSideProps({ params }) {
  // const allTags = await getAllTags()
  const post = await getPost({ slug: params.postSlug })
  return { props: { post } }
}
