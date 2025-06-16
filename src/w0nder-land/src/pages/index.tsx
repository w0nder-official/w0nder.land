import { HeadContentMeta } from '@/components/common/HeadContentMeta';
import { Share } from '@/components/common/Share';
import { DefaultLayout } from '@/components/layouts/DefaultLayout';
import { Button } from '@/components/ui/button';
import { CoffeeChatLink, Email, FiWorkersLink, ShowYourTimeLink } from '@/constants/common';
import { Configure } from '@/constants/configure';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import { ProfilePage, WithContext } from 'schema-dts';

const SOCIAL_ICON_MAP = {
  twitter: 'ri-twitter-x-fill',
  github: 'ri-github-fill',
  threads: 'ri-threads-fill',
  email: 'ri-mail-line',
} as const;

const SOCIAL_URL_MAP = {
  twitter: 'https://x.com/',
  github: 'https://github.com/',
  threads: 'https://threads.net/',
  email: 'mailto:',
} as const;

type SocialType = keyof typeof SOCIAL_ICON_MAP;

const data = {
  id: 'w0nder',
  name: 'w0nder',
  bio: '개발합니다. 만듭니다.',
  description: `10년 넘게 콘텐츠, 모빌리티, 이커머스, 메디컬, AI 스타트업에서 기민하고 응집력 있게 일해왔습니다.
다양한 포지션에서 개발과 매니징을 해왔고, 최근 4년간은 CTO로 일하고 있습니다.
경험을 나누고자 클라우드 보안 도서를 집필했고, 대학 강의와 주니어 개발자 커리어 상담을 하고 있습니다.
또한 개발자 커뮤니티에서 다양한 스터디와 독서모임을 운영하며 함께 성장하는 문화를 만들어가고 있습니다.`,
  profileImageUrl: 'https://w0nder.work/images/profile_image.png',
  email: Email,
  socialLinks: [
    { username: 'alice@w0nder.land', type: 'email' },
    { username: 'w0nder_official', type: 'twitter' },
    { username: 'w0nder_official', type: 'github' },
    { username: 'w0nder_official', type: 'threads' },
  ],
  links: [
    { title: 'Show Your Time', icon: 'ri-camera-fill', url: ShowYourTimeLink, type: 'link' },
    { title: 'fi-workers', icon: 'ri-building-line', url: FiWorkersLink, type: 'link' },
    { title: 'Coffee Chat', icon: 'ri-cup-fill', url: CoffeeChatLink, type: 'link' },
    { title: 'Blog', icon: 'ri-book-open-line', url: '/posts', type: 'link' },
  ],
};

const structuredData: WithContext<ProfilePage> = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  dateCreated: '2023-11-28T00:00:00+09:00',
  dateModified: '2023-11-28T00:00:00+09:00',
  mainEntity: {
    '@type': 'Person',
    name: data.name,
    description: data.bio,
    image: data.profileImageUrl,
    email: data.email,
  },
};

const AboutPage = () => {
  const [isShareOpen, setIsShareOpen] = useState(false);

  const handleShareOpen = useCallback(() => {
    setIsShareOpen(true);
  }, []);

  // 네모 색상과 위치 배열 추가
  const shapeColors = ['#FFD600', '#FF7A5C', '#A7DBD8', '#F4D738', '#C4A1FF'];
  const shapePositions = [
    'absolute -top-3 -left-3',
    'absolute -top-3 -right-3',
    'absolute -bottom-3 -left-3',
    'absolute -bottom-3 -right-3',
  ];
  const shapeTypes = ['square', 'rect', 'triangle'];

  return (
    <>
      <HeadContentMeta
        title="소개"
        description={data.bio}
        ogUrl={`${Configure.ServiceUrl}/images/og.png`}
        structuredData={structuredData}
      />

      <DefaultLayout>
        <div className="p-3">
          {/* 프로필, 이름 강조 영역 */}
          <div className="relative mt-32">
            {/* 네오브루탈리즘 도형들 */}
            {/* 파란 사각형 */}
            <svg className="absolute top-20 left-4" width="120" height="40">
              <rect width="120" height="40" fill="#7EDCFF" stroke="black" strokeWidth="3" />
            </svg>
            {/* 초록 네모 */}
            <svg className="absolute top-0 right-24" width="60" height="60">
              <rect width="60" height="60" fill="#6EDC6E" stroke="black" strokeWidth="3" />
            </svg>
            {/* 빨강 반원 */}
            <svg className="absolute bottom-8 right-8" width="60" height="60">
              <path d="M60,60 A30,30 0 1,1 0,60 Z" fill="#FF6B6B" stroke="black" strokeWidth="3" />
            </svg>
            {/* 검정 삼각형 */}
            <svg className="absolute left-1/2 top-32" width="80" height="70" style={{ transform: 'translateX(-50%)' }}>
              <polygon points="40,0 80,70 0,70" fill="none" stroke="black" strokeWidth="4" />
            </svg>
            {/* 노랑 격자 */}
            <svg className="absolute top-8 left-32" width="40" height="40">
              <g stroke="#FFD600" strokeWidth="2">
                {[0, 10, 20, 30, 40].map(x => (
                  <line key={`gx${x}`} x1={x} y1="0" x2={x} y2="40" />
                ))}
                {[0, 10, 20, 30, 40].map(y => (
                  <line key={`gy${y}`} x1="0" y1={y} x2="40" y2={y} />
                ))}
              </g>
            </svg>
            {/* 점선 */}
            <svg
              className="absolute left-1/2 top-1/2"
              width="80"
              height="10"
              style={{ transform: 'translate(-50%, -50%)' }}>
              <line x1="0" y1="5" x2="80" y2="5" stroke="#A388EE" strokeWidth="2" strokeDasharray="6,6" />
            </svg>
            {/* 교차선 + 노랑 사각 포인트 */}
            <svg className="absolute bottom-8 right-32" width="40" height="40">
              <rect x="14" y="14" width="12" height="12" fill="#FFD600" stroke="black" strokeWidth="2" />
              <line x1="20" y1="0" x2="20" y2="40" stroke="black" strokeWidth="2" />
              <line x1="0" y1="20" x2="40" y2="20" stroke="black" strokeWidth="2" />
            </svg>
            {/* 기존 도형 일부 유지 (별, 곡선, 하트 등) */}
            <svg className="absolute top-0 right-0" width="48" height="48" viewBox="0 0 48 48">
              <polygon
                points="24,2 29,18 46,18 32,28 37,44 24,34 11,44 16,28 2,18 19,18"
                fill="#C4A1FF"
                stroke="black"
                strokeWidth="2"
              />
            </svg>
            <svg className="absolute left-0 bottom-0" width="60" height="40">
              <path d="M5,35 Q30,0 55,35" stroke="#FF6B6B" strokeWidth="3" fill="none" />
            </svg>
            <svg
              className="absolute top-8 left-1/2"
              width="32"
              height="32"
              style={{ transform: 'translateX(-50%) rotate(-15deg)' }}>
              <path
                d="M16 29s-13-8.35-13-16.5S9.5 2 16 8.5 29 2 29 12.5 16 29 16 29z"
                fill="#FF69B4"
                stroke="black"
                strokeWidth="2"
              />
            </svg>
            {/* 프로필 이미지와 이름 */}
            <div className="relative flex flex-col items-center">
              <Image
                alt="profile_image"
                src={data.profileImageUrl}
                width="250"
                height="250"
                className="rounded-full bg-amber-200 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              />
              <div className="mt-6 text-center">
                <div className="font-extrabold text-6xl bg-white px-6 py-2 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] inline-block mb-10">
                  {data.name}
                </div>
              </div>

              {/* bio 박스 */}
              <div className="relative mb-6">
                {/* 컬러 블록 포인트 */}
                <div className="absolute -top-2 -left-2 w-4 h-4 bg-[#FF7A5C] border-2 border-black" />
                <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-[#F4D738] border-2 border-black" />
                <div className="font-extrabold uppercase text-lg bg-[#FFDB58] border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] px-6 py-3 -rotate-1">
                  {data.bio}
                </div>
              </div>
            </div>
          </div>

          <div className="py-10 flex flex-col gap-4">
            {/* description 박스 */}
            <div className="relative mb-6">
              <div className="absolute -top-3 -right-3 w-6 h-6 bg-[#A7DBD8] border-2 border-black transform rotate-12" />
              <div className="bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] px-6 py-4 text-lg font-bold uppercase whitespace-pre-line leading-relaxed rotate-1">
                {data.description}
              </div>
            </div>
          </div>

          <div className="py-4">
            <div className="flex flex-wrap gap-4 justify-center">
              {data.socialLinks.map(link => {
                const isEmail = link.type === 'email';
                const href = isEmail
                  ? `mailto:${link.username}`
                  : `${SOCIAL_URL_MAP[link.type as SocialType]}${link.username}`;

                // 소셜별 컬러 지정
                let socialBg = 'bg-white text-black';
                if (link.type === 'twitter') {
                  socialBg = 'bg-[#1DA1F2] text-white';
                }
                if (link.type === 'github') {
                  socialBg = 'bg-[#24292F] text-white';
                }
                if (link.type === 'threads') {
                  socialBg = 'bg-[#C4A1FF] text-black';
                }
                if (link.type === 'email') {
                  socialBg = 'bg-[#FFB2EF] text-black';
                }

                return (
                  <Link key={link.type} href={href} target="_blank" className="hover:opacity-80 transition-opacity">
                    <Button
                      variant="default"
                      size="lg"
                      className={`border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] h-14 w-14 text-3xl font-bold uppercase rounded-xl hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all flex items-center justify-center ${socialBg}`}>
                      <i className={`${SOCIAL_ICON_MAP[link.type as SocialType]} text-3xl`} />
                    </Button>
                  </Link>
                );
              })}

              <Button
                onClick={handleShareOpen}
                size="lg"
                className="border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] h-14 w-14 text-3xl font-bold uppercase rounded-xl hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all flex items-center justify-center bg-[#F4D738] text-black">
                <span className="flex items-center gap-2">
                  <i className="ri-share-line text-3xl" />
                </span>
              </Button>
              <Share
                title="w0nder"
                text={data.bio}
                url={`${Configure.ServiceUrl}/about`}
                isOpen={isShareOpen}
                onClose={() => setIsShareOpen(false)}
              />
            </div>
          </div>

          <ul className="flex flex-col gap-4 pt-10 pb-10">
            {data.links.map((link, idx) => {
              // 도형 개수: 0~2개
              const shapeCount = (idx * 7) % 3; // 0,1,2
              const shapes = Array.from({ length: shapeCount });
              return (
                <li key={link.title}>
                  <Link href={link.url} target="_blank" className="block">
                    <div
                      className={`relative border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-none px-6 py-4 flex items-center justify-between my-2
                          transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none
                          ${link.title === 'Show Your Time' ? 'bg-[#4F8CFF]' : ''}
                          ${link.title === 'fi-workers' ? 'bg-[#A7DBD8]' : ''}
                          ${link.title === 'Coffee Chat' ? 'bg-[#FF7A5C]' : ''}
                          ${link.title === 'Blog' ? 'bg-[#C4A1FF]' : ''}
                        `}>
                      {/* 포인트 도형 - index 기반 개수/종류/위치/색상 */}
                      {shapes.map((_, sIdx) => {
                        const type = shapeTypes[(idx + sIdx) % shapeTypes.length];
                        const color = shapeColors[(idx + sIdx * 2) % shapeColors.length];
                        const pos = shapePositions[(idx + sIdx * 3) % shapePositions.length];
                        const shapeKey = `${link.title}-shape-${sIdx}`;
                        if (type === 'square') {
                          return (
                            <div
                              key={shapeKey}
                              className={`${pos} w-6 h-6`}
                              style={{ background: color, border: '2px solid black' }}
                            />
                          );
                        }
                        if (type === 'rect') {
                          return (
                            <div
                              key={shapeKey}
                              className={`${pos} w-10 h-4`}
                              style={{ background: color, border: '2px solid black' }}
                            />
                          );
                        }
                        if (type === 'triangle') {
                          return (
                            <svg key={shapeKey} className={pos} width="40" height="40" style={{ position: 'absolute' }}>
                              <polygon points="0,20 10,0 20,20" fill={color} stroke="black" strokeWidth="2" />
                            </svg>
                          );
                        }
                        return null;
                      })}
                      {/* 아이콘 */}
                      <div className="flex-shrink-0 mr-4">
                        <i
                          className={`${link.icon} text-5xl bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-2`}
                        />
                      </div>
                      {/* 텍스트 */}
                      <div className="flex-1 min-w-0">
                        <div className="font-extrabold text-2xl md:text-3xl uppercase truncate">{link.title}</div>
                        <div className="text-base md:text-lg font-semibold mt-1 opacity-80 truncate">
                          {link.title === 'Show Your Time' && '시간 인증 프로젝트'}
                          {link.title === 'fi-workers' && '프리랜서 커뮤니티'}
                          {link.title === 'Coffee Chat' && '커리어/상담'}
                          {link.title === 'Blog' && '개발/커리어 블로그'}
                        </div>
                      </div>
                      {/* 화살표 */}
                      <div className="flex-shrink-0 ml-4">
                        <div className="bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] w-12 h-12 flex items-center justify-center">
                          <i className="ri-arrow-right-s-line text-3xl" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </DefaultLayout>
    </>
  );
};

export default AboutPage;
