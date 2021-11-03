import Script from 'next/script'
import * as fbq from 'backend/fpixel'

export default function FacebookPixel() {
  // console.log("Pixel ID", fbq.FB_PIXEL_ID)
  return (
    <Script
      strategy="afterInteractive"
      id="facebook-pixel"
      dangerouslySetInnerHTML={{
        __html: `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', ${fbq.FB_PIXEL_ID});
      `,
      }}
    />
  )
}
