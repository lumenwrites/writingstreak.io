import 'prismjs/themes/prism-tomorrow.css'
import '../styles/style.scss'
import 'components/Elements/FontawsomeSetup'

import CombinedContextsProvider from 'context/CombinedContexts'
import PlausibleProvider from 'next-plausible'

// Both modals have to be here, because they're useful in index.tsx as well as paywalled course pages
// and index.tsx isn't wrapped in layout
import LoginModal from 'components/Users/LoginModal'
// import PurchaseModal from 'components/Payments/PurchaseModal'
import CheckoutModal from 'components/Payments/CheckoutModal'
import SubmitPostModal from 'components/CTAs/SubmitPostModal'
import DefaultHead from 'components/Layout/DefaultHead'
import ReactTooltip from 'react-tooltip'

import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

function App({ Component, pageProps }) {
  // Need this for the react-tooltip: https://stackoverflow.com/questions/64079321/react-tooltip-and-next-js-ssr-issue
  const [isMounted, setIsMounted] = useState(false) 
  const router = useRouter()
  useEffect(() => {
    document.querySelector('html').dataset.theme = 'dark1'
    setIsMounted(true)
  })
  useEffect(() => {
    ReactTooltip.rebuild()
   }, [router])
  return (
    <PlausibleProvider domain={process.env.NEXT_PUBLIC_PLAUSIBLE_ANALYTICS_DOMAIN}>
      <CombinedContextsProvider>
        <DefaultHead />
        <Component {...pageProps} />
        <CheckoutModal />
        <LoginModal />
        <SubmitPostModal />
        {isMounted && <ReactTooltip effect="solid" />}
      </CombinedContextsProvider>
    </PlausibleProvider>
  )
}

export default App
