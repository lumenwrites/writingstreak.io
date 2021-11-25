import 'prismjs/themes/prism-tomorrow.css'
import '../styles/style.scss'
import 'components/Elements/FontawsomeSetup'

import CombinedContextsProvider from 'context/CombinedContexts'
import PlausibleProvider from 'next-plausible'

// Both modals have to be here, because they're useful in index.tsx as well as paywalled course pages
// and index.tsx isn't wrapped in layout
import LoginModal from 'components/Users/LoginModal'
import SubscribeModal from 'components/Layout/SubscribeModal'
import DefaultHead from 'components/Layout/DefaultHead'

function App({ Component, pageProps }) {
  return (
    <PlausibleProvider domain={process.env.NEXT_PUBLIC_PLAUSIBLE_ANALYTICS_DOMAIN}>
      <CombinedContextsProvider>
        <DefaultHead />
        <Component {...pageProps} />
        <LoginModal />
        <SubscribeModal/>
      </CombinedContextsProvider>
    </PlausibleProvider>
  )
}

export default App
