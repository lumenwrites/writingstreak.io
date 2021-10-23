import 'prismjs/themes/prism-tomorrow.css'
import '../styles/style.scss'
import 'components/Elements/FontawsomeSetup'

import CombinedContextsProvider from 'context/CombinedContexts'
// import useAnalytics from 'hooks/useAnalytics'

// Both modals have to be here, because they're useful in index.tsx as well as paywalled course pages
// and index.tsx isn't wrapped in layout
import LoginModal from 'components/Users/LoginModal'
import PurchaseModal from 'components/Users/PurchaseModal'

// https://stripe.com/docs/stripe-js/react#elements-provider
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_CLIENT_SECRET)

function App({ Component, pageProps }) {
  // useAnalytics()
  return (
    <CombinedContextsProvider>
      <Component {...pageProps} />
      {/* <Elements stripe={stripePromise}>
        <PurchaseModal />
      </Elements>
      <LoginModal/> */}
    </CombinedContextsProvider>
  )
}

export default App
