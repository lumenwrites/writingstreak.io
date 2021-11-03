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
          {/* <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                    page_path: window.location.pathname,
                  });
                `,
            }}
          /> */}
          {/* Plausible Analytiics */}
          {/* <script defer data-domain="academy.rpgadventures.io" src="https://plausible.io/js/plausible.js"></script> */}
          {/* <script>window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }</script> */}
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
          {/* Clicky Analytics */}
          <script async src="//static.getclicky.com/101338515.js"></script>
          <noscript>
            <img alt="Clicky" width="1" height="1" src="//in.getclicky.com/101338515ns.gif" />
          </noscript>
        </body>
      </Html>
    )
  }
}
