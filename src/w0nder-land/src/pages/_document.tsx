import { Head, Html, Main, NextScript } from 'next/document';
import { TrackingScript } from '@/components/common/TrackingScript';
import { Configure } from '@/constants/configure';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />

        <meta name="google-adsense-account" content="ca-pub-9562383946948731" />

        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />

        <link rel="alternate" type="application/xml" title="Sitemap" href={`${Configure.ServiceUrl}/sitemap.xml`} />
        <link rel="alternate" type="application/rss+xml" href={`${Configure.ServiceUrl}/rss.xml`} />

        <meta name="naver-site-verification" content="963e16f6001702e8c4a4c23f53d37fbbf677fe65" />
      </Head>

      <body>
        <Main />
        <NextScript />
        <TrackingScript />
      </body>
    </Html>
  );
}
