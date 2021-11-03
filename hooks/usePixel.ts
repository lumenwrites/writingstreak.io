// https://github.com/vercel/next.js/blob/canary/examples/with-facebook-pixel/pages/_app.js
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import * as fbq from 'backend/fpixel'

export default function usePixel() {
  const router = useRouter()
  useEffect(() => {
    fbq.pageview()
    const handleRouteChange = () => { fbq.pageview() }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])
}
