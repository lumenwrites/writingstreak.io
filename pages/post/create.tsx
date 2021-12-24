// import dynamic from 'next/dynamic'
// https://nextjs.org/docs/advanced-features/dynamic-import#with-no-ssr
// const EditorNoSSR = dynamic(() => import('../../components/Editor/Editor'), { ssr: false })
import Editor from 'components/Editor/Editor'

export default function CreatePost({ user, days }) {
  // return <EditorNoSSR post={null} user={user} days={days} />
  return <Editor post={null} user={user} days={days} />
}

import { getUser } from 'prisma/api/users/get-user'
import { getDays } from 'prisma/api/stats/get-days'

export async function getServerSideProps({ req, params }) {
  const user = await getUser(req)
  if (!user) return { redirect: { permanent: false, destination: '/' }, props: {} }
  if (user.subscriptionStatus === 'FREE' && user.subscriptionExpired) {
    // If trial expired - redirect to paywall
    return { redirect: { permanent: false, destination: '/payments/trial-expired' }, props: {} }
  }
  const { username, twitter, writingDays, targetWordcount, sprintPace, sprintDuration, startDate, endDate, writingGoal } = user
  const days = await getDays(user, 366)
  return { props: { user: { username, twitter, writingDays, targetWordcount, sprintPace, sprintDuration, startDate, endDate, writingGoal }, days } }
}
