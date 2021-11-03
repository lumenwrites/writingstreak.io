import 'prismjs/themes/prism-tomorrow.css'
import '../styles/style.scss'
import 'components/Elements/FontawsomeSetup'

import CombinedContextsProvider from 'context/CombinedContexts'
// import useAnalytics from 'hooks/useAnalytics'
import PlausibleProvider from 'next-plausible'

// Both modals have to be here, because they're useful in index.tsx as well as paywalled course pages
// and index.tsx isn't wrapped in layout
import LoginModal from 'components/Users/LoginModal'
import PurchaseModal from 'components/Users/PurchaseModal'
// import SubscribeModal from 'components/Layout/SubscribeModal'
import DefaultHead from 'components/Layout/DefaultHead'

// https://stripe.com/docs/stripe-js/react#elements-provider
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_CLIENT_SECRET)

// Facebook pixel
import FacebookPixel from 'components/Elements/FacebookPixel'
import usePixel from 'hooks/usePixel'

function App({ Component, pageProps }) {
  usePixel()
  return (
    <PlausibleProvider domain={process.env.NEXT_PUBLIC_PLAUSIBLE_ANALYTICS_DOMAIN}>
      <CombinedContextsProvider>
        <FacebookPixel/>
        <DefaultHead />
        <Component {...pageProps} />
        <Elements stripe={stripePromise}>
          <PurchaseModal />
        </Elements>
        <LoginModal />
        {/* <SubscribeModal/> */}
      </CombinedContextsProvider>
    </PlausibleProvider>
  )
}

export default App
