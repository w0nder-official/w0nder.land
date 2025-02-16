import { HeadContentMeta } from '@/components/common/HeadContentMeta';
import { Share } from '@/components/common/Share';
import { DefaultLayout } from '@/components/layouts/DefaultLayout';
import { CoffeeChatLink, Email, FiWorkersLink, GithubLink, ShowYourTimeLink, TwitterLink } from '@/constants/common';
import { Configure } from '@/constants/configure';
import Image from 'next/image';
import Link from 'next/link';
import { ProfilePage, WithContext } from 'schema-dts';

const BinaryBookClubUrl = '/binary-book-club';
const Description = '개발합니다. 만듭니다.';

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
          <div>
            10년 넘게 콘텐츠, 모빌리티, 이커머스, 메디컬, AI 스타트업에서 기민하고 응집력 있게 일해왔습니다.
            <br />
            다양한 포지션에서 개발과 매니징을 해왔고, 최근 4년간은 CTO로 일하고 있습니다.
            <br />
            경험을 나누고자 클라우드 보안 도서를 집필했고, 대학 강의와 주니어 개발자 커리어 상담을 하고 있습니다.
            <br />
            또한 개발자 커뮤니티에서 다양한 스터디와 독서모임을 운영하며 함께 성장하는 문화를 만들어가고 있습니다.
            <br />
          </div>
        </div>

        <div className="py-10">
          <Share title="w0nder" text={Description} url={`${Configure.ServiceUrl}/about`} />
        </div>

        <ul>
          <Link href={`mailto:${Email}`} target="_blank">
            <li className={LinkStyle}>
              <span>
                <i className="ri-mail-line" />
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
                <i className="ri-camera-fill" />
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
          <Link href={CoffeeChatLink} target="_blank">
            <li className={LinkStyle}>
              <span>
                <i className="ri-cup-fill" />
                &nbsp;Coffee Chat
              </span>
              <span>{CoffeeChatLink}</span>
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
