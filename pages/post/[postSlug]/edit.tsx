// import dynamic from 'next/dynamic'
// https://nextjs.org/docs/advanced-features/dynamic-import#with-no-ssr
// const EditorNoSSR = dynamic(() => import('../../../components/Editor/Editor'), { ssr: false })

import Editor from 'components/Editor/Editor'

export default function EditPost({ post, user, days }) {
  // return <EditorNoSSR post={post} user={user} days={days} />
  return <Editor post={post} user={user} days={days} />
}

import { getUser } from 'prisma/api/users/get-user'
import { getPost } from 'prisma/api/posts/get-post'
import { getDays } from 'prisma/api/stats/get-days'

export async function getServerSideProps({ req, params }) {
  // const allTags = await getAllTags()
  const post = await getPost({ slug: params.postSlug })
  const user = await getUser(req)
  if (!user || !post || post.author.username !== user.username) {
    return { redirect: { permanent: false, destination: '/' }, props: {} }
  }
  const { username, twitter, writingDays, targetWordcount, sprintPace, sprintDuration, startDate, endDate, writingGoal } = user
  const days = await getDays(user, 366)
  return { props: { post, days, user: { username, twitter, writingDays, targetWordcount, sprintPace, sprintDuration, startDate, endDate, writingGoal } } }
}
