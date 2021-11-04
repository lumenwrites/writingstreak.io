// Doesn't do anything special, just here for reference.
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { FB_PIXEL_ID } from 'backend/fpixel'

// Google Analytics Setup
// https://mariestarck.com/add-google-analytics-to-your-next-js-application-in-5-easy-steps/
export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Facebook Pixel */}
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: 'none' }}
              src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
            />
          </noscript>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
