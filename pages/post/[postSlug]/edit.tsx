import dynamic from 'next/dynamic'
import Layout from 'components/Layout/Layout'
import { EditorInfoContextProvider } from 'context/EditorContext'

// import TipTap from 'components/Editor/TipTap'
// https://nextjs.org/docs/advanced-features/dynamic-import#with-no-ssr
const EditorNoSSR = dynamic(() => import('../../../components/Editor/Editor'), { ssr: false })

export default function Home({ post }) {
  return (
    <Layout>
      <EditorInfoContextProvider>
        <EditorNoSSR post={post} />
      </EditorInfoContextProvider>
    </Layout>
  )
}

import { getPost } from 'prisma/api/posts/get-post'

export async function getServerSideProps({ params }) {
  // const allTags = await getAllTags()
  // TODO: make sure I'm the post's author, if I'm not - redirect away
  const post = await getPost({ slug: params.postSlug })
  return { props: { post } }
}
