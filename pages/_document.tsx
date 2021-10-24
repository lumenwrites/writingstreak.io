// Doesn't do anything special, just here for reference.
import Document, { Html, Head, Main, NextScript } from 'next/document'

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
        </Head>
        <body>
          <Main />
          <NextScript />
          {/* Clicky Analytics */}
          <a title="Real Time Web Analytics" href="http://clicky.com/101338515">
            <img alt="Clicky" src="//static.getclicky.com/media/links/badge.gif" border="0" />
          </a>
          <script async src="//static.getclicky.com/101338515.js"></script>
          <noscript>
            <p>
              <img alt="Clicky" width="1" height="1" src="//in.getclicky.com/101338515ns.gif" />
            </p>
          </noscript>
        </body>
      </Html>
    )
  }
}
