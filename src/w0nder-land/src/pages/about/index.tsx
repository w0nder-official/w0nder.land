import Image from 'next/image';
import Link from 'next/link';
import { ProfilePage, WithContext } from 'schema-dts';
import { DefaultLayout } from '@/components/layouts/DefaultLayout';
import { Email, FiWorkersLink, GithubLink, ShowYourTimeLink, TwitterLink } from '@/constants/common';
import { HeadContentMeta } from '@/components/common/HeadContentMeta';
import { Configure } from '@/constants/configure';

const BinaryBookClubUrl = '/binary-book-club';
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
      ogUrl={`${Configure.ServiceUrl}/images/og.png`}
      structuredData={structuredData}
    />
    <DefaultLayout>
      <div className="px-4">
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
              <span>
                ️<i className="ri-mail-line" />
                &nbsp;Email
              </span>
              <span>{Email}</span>
            </li>
          </Link>
          <Link href={TwitterLink} target="_blank">
            <li className={LinkStyle}>
              <span>
                <i className="ri-twitter-line" />
                &nbsp;Twitter
              </span>
              <span>{TwitterLink}</span>
            </li>
          </Link>
          <Link href={ShowYourTimeLink} target="_blank">
            <li className={LinkStyle}>
              <span>
                <i className="ri-camera-ai-fill" />
                &nbsp;Show Your Time
              </span>
              <span>{ShowYourTimeLink}</span>
            </li>
          </Link>
          <Link href={FiWorkersLink} target="_blank">
            <li className={LinkStyle}>
              <span>
                <i className="ri-building-line" />
                &nbsp;fi-workers
              </span>
              <span>{FiWorkersLink}</span>
            </li>
          </Link>
          <Link href={GithubLink} target="_blank">
            <li className={LinkStyle}>
              <span>
                <i className="ri-github-fill" />
                &nbsp;Github
              </span>
              <span>{GithubLink}</span>
            </li>
          </Link>
          <Link href={BinaryBookClubUrl} target="_blank">
            <li className={LinkStyle}>
              <span>
                <i className="ri-book-open-line" />
                &nbsp;Binary Book Club
              </span>
            </li>
          </Link>
        </ul>
      </div>
    </DefaultLayout>
  </>
);

export default AboutPage;

const LinkStyle = 'p-2 flex justify-between border-b-2 hover:border-b-fuchsia-500';
