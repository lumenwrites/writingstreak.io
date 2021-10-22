import 'prismjs/themes/prism-tomorrow.css'
import '../styles/style.scss'
import 'components/Elements/FontawsomeSetup'

import CombinedContextsProvider from 'context/CombinedContexts'
import useAnalytics from 'hooks/useAnalytics'

function App({ Component, pageProps }) {
  useAnalytics()
  return (
    <CombinedContextsProvider>
      <Component {...pageProps} />
    </CombinedContextsProvider>
  )
}

export default App
