import Head from 'next/head'
import config from 'config.json'

export default function DefaultHead() {
  return (
    <Head>
      {/* Default values, can be overridden in other pages */}
      <title>{config.title}</title>
      <meta name="description" content={config.description} />
      {/* Open Graph */}
      <meta property="og:title" content={config.title} key="ogtitle" />
      <meta property="og:site_name" content={config.title} key="ogsitename" />
      <meta property="og:description" content={config.description} key="ogdesc" />
      <meta property="og:image" content={config.socialImage} key="ogimage" />
      {/* <meta property="og:url" content={config.currentURL} key="ogurl" /> */}
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" key="twcard" />
      <meta name="twitter:title" content={config.title} />
      <meta name="twitter:creator" content={config.twitterCreator} key="twhandle" />
      <meta name="twitter:site" content={config.twitterSite} />
      <meta name="twitter:description" content={config.description} />
      <meta name="twitter:image" content={config.socialImage} />
    </Head>
  )
}
