import { Configure } from '@/constants/configure';
import Script from 'next/script';

export const TrackingScript = () =>
  Configure.GaTrackingId && (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${Configure.GaTrackingId}`} />
      <Script id="google-analytics">
        {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
     
              gtag('config', '${Configure.GaTrackingId}');
            `}
      </Script>
    </>
  );
