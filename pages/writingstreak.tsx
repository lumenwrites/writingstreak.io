import Editor from 'components/Editor/Editor'
import Landing from 'components/CTAs/Landing'

export default function Index({ copy }) {
  // const authenticated = true
  // if (authenticated) {
  //   return <Editor />
  // }
  return <Landing copy={copy} />
}


import pages from 'backend/json/out/pages.json'

export async function getServerSideProps({ params, req }) {
  const copy = pages.find(p => p.slug === 'writing-streak-landing')
  return { props: { copy } }
}

