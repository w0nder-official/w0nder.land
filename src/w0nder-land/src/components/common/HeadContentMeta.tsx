import Head from 'next/head';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { Organization, Person, WebSite, WithContext } from 'schema-dts';
import { TwitterLink } from '@/constants/common';
import { beUnique } from '@/libs/utils/array';

export type HeadContentMetaProps = {
  title: string;
  description: string;
  ogUrl?: string;
  // FIXME: schema-dts의 type을 잘못 사용하고 있다.
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  structuredData?: Record<string, any>;
};

export const HeadContentMeta = ({ title, description, ogUrl: ogUrlProps, structuredData }: HeadContentMetaProps) => {
  const router = useRouter();
  const pageUrl = `https://w0nder.land${router.asPath ?? '/'}`;
  const dynamicOgUrl = `https://w0nder.land/api/og/t-001?url=${encodeURIComponent(pageUrl)}`;
  const ogUrl = ogUrlProps ?? dynamicOgUrl;

  const jsonLd = useMemo(() => {
    const author = {
      '@type': 'Person',
      name: 'w0nder',
      url: 'https://w0nder.land/about',
    } as Person;

    const keywords = ['developer', 'programming', 'w0nder', 'w0nder.land'];

    return {
      __html: JSON.stringify([
        {
          ...structuredData,
          image: beUnique([...(structuredData?.image ?? []), ogUrl]),
          author: [...(structuredData?.author ?? []), author],
          keywords: beUnique([...(structuredData?.keywords ?? []), keywords]),
        } ??
          ({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            headline: title,
            name: title,
            keywords,
            description,
            image: [ogUrl],
            author: [author],
          } satisfies WithContext<WebSite>),
        {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          url: 'https://w0nder.land',
          logo: 'https://w0nder.land/images/og.png',
          sameAs: [TwitterLink],
        } satisfies WithContext<Organization>,
      ]),
    };
  }, [description, ogUrl, structuredData, title]);

  return (
    <Head>
      <title>{`${title} | w0nder.land`}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="programmer, developer, w0nder, w0nder.land, 개발자" />
      <meta name="author" content="w0nder" />
      <meta name="robots" content="ALL" />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:image" content={ogUrl} />
      <meta property="og:image:url" content={ogUrl} />
      <meta property="og:site_name" content="w0nder.land" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@w0nder_offcial" />
      <meta property="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogUrl} />

      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd} />
    </Head>
  );
};