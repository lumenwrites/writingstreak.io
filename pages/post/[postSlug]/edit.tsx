import dynamic from 'next/dynamic'
import Layout from 'components/Layout/Layout'
import { EditorInfoContextProvider } from 'context/EditorContext'

// import TipTap from 'components/Editor/TipTap'
// https://nextjs.org/docs/advanced-features/dynamic-import#with-no-ssr
const EditorNoSSR = dynamic(() => import('../../../components/Editor/Editor'), { ssr: false })

export default function Home({ post }) {
  return (
    <EditorInfoContextProvider>
      <EditorNoSSR post={post} />
    </EditorInfoContextProvider>
  )
}

import { getUser } from 'prisma/api/users/get-user'
import { getPost } from 'prisma/api/posts/get-post'

export async function getServerSideProps({ req, params }) {
  // const allTags = await getAllTags()
  const post = await getPost({ slug: params.postSlug })
  const user = await getUser(req)
  if (!user || post.author.username !== user.username) return { redirect: { permanent: false, destination: '/' }, props: {} }
  return { props: { post } }
}
