import dynamic from 'next/dynamic'

// https://nextjs.org/docs/advanced-features/dynamic-import#with-no-ssr
const EditorNoSSR = dynamic(() => import('../../components/Editor/Editor'), { ssr: false })

export default function EditPost({ user }) {
  return <EditorNoSSR post={null} user={user} />
}

import { getUser } from 'prisma/api/users/get-user'

export async function getServerSideProps({ req, params }) {
  const user = await getUser(req)
  if (!user) {
    return { redirect: { permanent: false, destination: '/' }, props: {} }
  }
  const { username, twitter, writingDays, targetWordcount, sprintPace, sprintDuration } = user
  return { props: { user: { username, twitter, writingDays, targetWordcount, sprintPace, sprintDuration } } }
}
