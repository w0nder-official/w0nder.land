import { HeadContentMeta } from '@/components/common/HeadContentMeta';
import { Share } from '@/components/common/Share';
import { DefaultLayout } from '@/components/layouts/DefaultLayout';
import { Button } from '@/components/ui/button';
import { PROFILE, SOCIALS, LINKS } from '@/constants/common';
import { Configure } from '@/constants/configure';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import { ProfilePage, WithContext } from 'schema-dts';

const structuredData: WithContext<ProfilePage> = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  dateCreated: '2023-11-28T00:00:00+09:00',
  dateModified: '2023-11-28T00:00:00+09:00',
  mainEntity: {
    '@type': 'Person',
    name: PROFILE.name,
    description: PROFILE.bio,
    image: PROFILE.profileImageUrl,
    email: PROFILE.email,
  },
};

const AboutPage = () => {
  const [isShareOpen, setIsShareOpen] = useState(false);

  const handleShareOpen = useCallback(() => {
    setIsShareOpen(true);
  }, []);

  return (
    <>
      <HeadContentMeta
        title="소개"
        description={PROFILE.bio}
        ogUrl={`${Configure.ServiceUrl}/images/og.png`}
        structuredData={structuredData}
      />

      <DefaultLayout>
        <div className="p-3">
          {/* 프로필, 이름 강조 영역 */}
          <div className="relative mt-32">
            {/* 프로필 이미지와 이름 */}
            <div className="relative flex flex-col items-center">
              <Image
                alt="profile_image"
                src={PROFILE.profileImageUrl}
                width="250"
                height="250"
                className="rounded-full bg-amber-200 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              />
              <div className="mt-6 text-center">
                <div className="font-extrabold text-6xl bg-white px-6 py-2 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] inline-block mb-10">
                  {PROFILE.name}
                </div>
              </div>

              {/* bio 박스 */}
              <div className="relative mb-6">
                <div className="font-extrabold uppercase text-xl bg-[#FFDB58] border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] px-6 py-3">
                  {PROFILE.bio}
                </div>
              </div>
            </div>
          </div>

          <div className="py-10 flex flex-col gap-4">
            {/* description 박스 */}
            <div className="relative mb-6">
              <div className="bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] px-6 py-4 text-xl font-bold uppercase whitespace-pre-line leading-relaxed">
                {PROFILE.description}
              </div>
            </div>
          </div>

          <div className="py-4">
            <div className="flex flex-wrap gap-4 justify-center">
              {SOCIALS.map(link => (
                <Link key={link.type} href={link.url} target="_blank" className="hover:opacity-80 transition-opacity">
                  <Button
                    variant="default"
                    size="lg"
                    className={`border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] h-14 w-14 text-3xl font-bold uppercase rounded-xl hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none active:shadow-none active:translate-x-0 active:translate-y-0 transition-all flex items-center justify-center ${link.bg}`}>
                    <i className={`${link.icon} text-3xl`} />
                  </Button>
                </Link>
              ))}

              <Button
                onClick={handleShareOpen}
                size="lg"
                className="border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] h-14 w-14 text-3xl font-bold uppercase rounded-xl hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none active:shadow-none active:translate-x-0 active:translate-y-0 transition-all flex items-center justify-center bg-[#F4D738] text-black">
                <span className="flex items-center gap-2">
                  <i className="ri-share-line text-3xl" />
                </span>
              </Button>
              <Share
                title="w0nder"
                text={PROFILE.bio}
                url={`${Configure.ServiceUrl}/about`}
                isOpen={isShareOpen}
                onClose={() => setIsShareOpen(false)}
              />
            </div>
          </div>

          <ul className="flex flex-col gap-1 py-10">
            {LINKS.map(link => (
              <Link href={link.url} className="block" key={link.id} target={link.target}>
                <li
                  className={`relative border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-none px-6 py-4 gap-4 flex items-center justify-between my-2
                          transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none
                          ${link.bg}
                        `}>
                  {/* 아이콘 */}
                  <div className="flex-shrink-0 border-4 border-black bg-white rounded-lg p-2">
                    <i className={`${link.icon} text-4xl p-2`} />
                  </div>

                  {/* 텍스트 */}
                  <div className="flex-1 min-w-0">
                    <div className="font-extrabold text-2xl md:text-3xl uppercase truncate">{link.title}</div>
                    {link.description && (
                      <div className="text-base md:text-lg font-semibold mt-1 opacity-80 truncate">
                        {link.description}
                      </div>
                    )}
                  </div>

                  {/* 화살표 */}
                  <div className="flex-shrink-0 ml-4">
                    <div className="bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] w-12 h-12 flex items-center justify-center">
                      <i className="ri-arrow-right-s-line text-3xl" />
                    </div>
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </DefaultLayout>
    </>
  );
};

export default AboutPage;
