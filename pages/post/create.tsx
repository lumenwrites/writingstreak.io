import dynamic from 'next/dynamic'
import Layout from 'components/Layout/Layout'

// import TipTap from 'components/Editor/TipTap'
// https://nextjs.org/docs/advanced-features/dynamic-import#with-no-ssr
const TipTapNoSSR = dynamic(() => import('../../components/Editor/TipTap'), { ssr: false })

export default function Home() {
  return (
    <Layout>
      <TipTapNoSSR post={null} />
    </Layout>
  )
}
