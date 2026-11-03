import Script from "next/script";

const GTM_ID = "GTM-55BXM4RG";

/** Google Tag Manager — global head scripts + body noscript fallback. */
export default function GoogleTagManager() {
  return (
    <>
      <Script id="gtm-datalayer-init" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        `}
      </Script>
      <Script
        id="gtm-js"
        src={`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`}
        strategy="beforeInteractive"
        async
      />
      <noscript>
        <iframe
          title="Google Tag Manager"
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>
    </>
  );
}
