import dynamic from 'next/dynamic'

// https://nextjs.org/docs/advanced-features/dynamic-import#with-no-ssr
const EditorNoSSR = dynamic(() => import('../../../components/Editor/Editor'), { ssr: false })

export default function EditPost({ post, user }) {
  return <EditorNoSSR post={post} user={user} />
}

import { getUser } from 'prisma/api/users/get-user'
import { getPost } from 'prisma/api/posts/get-post'

export async function getServerSideProps({ req, params }) {
  // const allTags = await getAllTags()
  const post = await getPost({ slug: params.postSlug })
  const user = await getUser(req)
  if (!user || !post || post.author.username !== user.username) {
    return { redirect: { permanent: false, destination: '/' }, props: {} }
  }
  const { username, twitter, writingDays, targetWordcount, sprintPace, sprintDuration } = user
  return { props: { post, user: { username, twitter, writingDays, targetWordcount, sprintPace, sprintDuration } } }
}
