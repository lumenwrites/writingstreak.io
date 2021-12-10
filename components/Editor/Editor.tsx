import dynamic from 'next/dynamic'
import Layout from 'components/Layout/Layout'
import { StatsContextProvider } from 'context/StatsContext'
// import TipTap from 'components/Editor/TipTap'

// https://nextjs.org/docs/advanced-features/dynamic-import#with-no-ssr
const TipTapNoSSR = dynamic(() => import('./TipTap'), { ssr: false })

export default function Home() {
  return (
    <div className="write">
      <StatsContextProvider>
        <TipTapNoSSR />
      </StatsContextProvider>
    </div>
  )
}
