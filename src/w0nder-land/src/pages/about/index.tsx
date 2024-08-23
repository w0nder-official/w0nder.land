import Image from 'next/image';
import Link from 'next/link';
import { ProfilePage, WithContext } from 'schema-dts';
import { DefaultLayout } from '@/components/layouts/DefaultLayout';
import { Email, TwitterLink } from '@/constants/common';
import { HeadContentMeta } from '@/components/common/HeadContentMeta';

const Description = `개발합니다. 만듭니다. ${TwitterLink}`;

const structuredData: WithContext<ProfilePage> = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  dateCreated: '2023-11-28T00:00:00+09:00',
  dateModified: '2023-11-28T00:00:00+09:00',
  mainEntity: {
    '@type': 'Person',
    name: 'w0nder',
    description: Description,
    sameAs: [TwitterLink],
  },
};

const AboutPage = () => (
  <>
    <HeadContentMeta
      title="소개"
      description={Description}
      ogUrl="https://w0nder.land/images/og.png"
      structuredData={structuredData}
    />
    <DefaultLayout>
      <Image
        alt="profile_image"
        src="/images/profile_image.jpg"
        width="250"
        height="250"
        className="rounded-full border-2 border-fuchsia-500"
      />
      <div className="py-10 flex flex-col gap-2">
        <div className="font-extrabold text-6xl">w0nder</div>
        <div>개발합니다. 만듭니다.</div>
      </div>

      <ul>
        <Link href={`mailto:${Email}`} target="_blank">
          <li className={LinkStyle}>
            <span>✉️</span>
            <span>{Email}</span>
          </li>
        </Link>
        <Link href={TwitterLink} target="_blank">
          <li className={LinkStyle}>
            <span>🐦‍⬛</span>
            <span>{TwitterLink}</span>
          </li>
        </Link>
      </ul>
    </DefaultLayout>
  </>
);

export default AboutPage;

const LinkStyle = 'p-2 flex justify-between border-b-2 hover:border-b-fuchsia-500';
