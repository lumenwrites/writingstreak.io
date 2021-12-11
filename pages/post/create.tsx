import dynamic from 'next/dynamic'
import Layout from 'components/Layout/Layout'
import { EditorInfoContextProvider } from 'context/EditorContext'

// import TipTap from 'components/Editor/TipTap'
// https://nextjs.org/docs/advanced-features/dynamic-import#with-no-ssr
const EditorNoSSR = dynamic(() => import('../../components/Editor/Editor'), { ssr: false })

export default function Home() {
  return (
    <EditorInfoContextProvider>
      <EditorNoSSR post={null} />
    </EditorInfoContextProvider>
  )
}
