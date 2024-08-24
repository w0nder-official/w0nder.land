import { type BlogPosting, WithContext } from 'schema-dts';
import { ChangeEvent, useCallback, useState } from 'react';
import Image from 'next/image';
import { HeadContentMeta } from '@/components/common/HeadContentMeta';
import { DefaultLayout } from '@/components/layouts/DefaultLayout';
import axios from 'axios';

const Title = '📖 Binary Book Club 을 모집합니다.';
const Description =
  '함께 읽고, 함께 배우며, 함께 성장해요. "Binary Book Club"에서 여러분을 만나볼 수 있길 기대하며, 2024년 새해를 맞이하는 책 읽기 여정에 초대합니다. 이번 해에는 소프트웨어 개발의 심오한 세계를 탐구할 세 권의 책으로 여정을 시작할 예정이에요.';

const structuredData: WithContext<BlogPosting> = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  dateCreated: '2023-12-12T00:00:00+09:00',
  dateModified: '2023-12-12T00:00:00+09:00',
  keywords: ['developer', 'programming', 'w0nder', 'w0nder.land', 'book club'],
  headline: Title,
  name: Title,
  description: Description,
};

const BinaryBookClubPage = () => {
  const [email, setEmail] = useState('');

  const handleEmailChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value), []);

  const handleEmailSubmit = useCallback(async () => {
    if (!email.trim()) {
      alert('이메일을 입력해 주세요.');
      return;
    }

    await axios.create().post('/api/binary-book-club/register', { email });

    alert('1기 모집이 마감되었습니다. 다음 시즌 신청 시작시 알려드릴께요.');
  }, [email]);

  return (
    <>
      <HeadContentMeta title={Title} description={Description} structuredData={structuredData} />

      <DefaultLayout>
        <div className="px-2">
          <div className="font-bold font-serif text-3xl pl-4">📖 Binary Book Club</div>
          <article className="flex flex-col items-center gap-80">
            <section className="flex flex-col items-center gap-8 my-48">
              <h1 className="font-bold text-3xl">새해, 새 시작: 함께 책으로 성장하기</h1>
              <div className="text-xl text-center">
                함께 읽고, 함께 배우며, 함께 성장해요.
                <br />세 권의 책으로 시작하는 우리의 2024년
              </div>
              <div>
                <input
                  type="email"
                  className="outline-none border-2 rounded-l-full border-blue-800 p-2 pl-6 w-70"
                  placeholder="이메일을 입력해 주세요."
                  value={email}
                  onChange={handleEmailChange}
                />
                <button
                  type="button"
                  className="border-r-2 border-t-2  border-b-2 rounded-r-full border-blue-800  bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4"
                  onClick={handleEmailSubmit}>
                  참여하기
                </button>
              </div>
            </section>

            <section className="flex flex-col items-center gap-8">
              <div className="font-bold text-3xl text-center">페이지를 넘길 때마다 성장하는 우리</div>
              <div className="text-xl px-6">
                안녕하세요, 저는 개발을 하고 있는 w0nder입니다. 저는 2024년의 새로운 도전을 찾고 있습니다. 혼자 책을
                읽고 공부하는 것도 좋지만, 여러 사람이 함께하면 배움이 더 깊고 넓어진다고 믿습니다. 이런 생각에서,
                [Binary Book Club]을 시작하게 되었습니다. 여기서는 단순히 책을 읽는 것을 넘어서, 서로의 생각을 나누고
                다양한 시각에서 읽은 내용을 토론하여 서로의 이해를 깊게 하고 지식을 탐구할 계획입니다.
              </div>
              <div className="text-xl px-6">
                여러분의 참여로 이 모임은 더욱 풍부해질 것입니다. [Binary Book Club]에서 여러분과 함께 지식 여정을
                시작하고자 합니다. 2024년이 여러분에게 새로운 발견과 성장의 해가 되길 바랍니다.
              </div>
              <div className="text-xl px-6">
                [Binary Book Club]에서는 백엔드 개발을 기반으로 한 도서 세 권을 선정했습니다. 난이도가 다른 이 도서들을
                통해 참가자들은 기본부터 심화 단계까지 차근차근 학습할 수 있습니다. 클라이언트, 백엔드, 인프라, 보안 등
                모든 개발 분야가 서로 연결되어 있다고 믿습니다. 이번에 선정한 도서들은 백엔드에 초점을 맞추고 있지만,
                프론트엔드나 앱 개발자들에게도 백엔드의 작동 방식과 사고 과정을 이해하는 데 큰 도움이 될 것입니다. 이는
                협업이나 클라이언트 설계에도 효과적인 지식이 됩니다.
              </div>
              <div className="text-xl px-6">
                이 통합적인 접근 방식은 다양한 개발 분야에 대한 통찰력을 제공하고, 서로 다른 배경을 가진 개발자들 간의
                이해와 협력을 증진시킬 것입니다. [Binary Book Club]은 이러한 통찰력과 협력을 바탕으로 여러분의 개발
                능력을 한 단계 높이는 데 도움을 줄 것입니다.
              </div>
              <div className="text-xl px-6">
                우리의 모임은 1월 7일부터 매주 일요일 저녁 8시에 온라인으로 진행될 예정입니다. 이때 서로의 생각을
                공유하고, 읽은 내용에 대한 다양한 시각과 통찰을 나누는 시간을 가질 예정입니다. 지식을 탐구하고 서로의
                이해를 깊게 하는 이 과정은 풍부한 토론을 통해 사고를 확장하고 성장할 수 있는 소중한 기회가 될 것입니다.
              </div>
              <div className="text-xl px-6">
                2024년이 지식을 쌓고 함께 성장하는 멋진 해가 되길 바라며, 새로운 발견과 변화를 기대하고 있습니다.
                여러분의 참여로 [Binary Book Club]의 책 읽기 모험은 더욱 특별해질 것입니다. 함께 책 속의 모험을 시작해
                봅시다!
              </div>
              <div className="text-xl px-6">
                2024년의 여정에서 여러분과 함께 하기를 기대합니다. 함께 학습하고, 성장하며, 서로를 영감 주는 시간을
                가져봅시다. 여러분의 참여를 기다리며, 새해 복 많이 받으세요!
              </div>
            </section>

            <section className="flex flex-col items-center gap-64">
              <div className="font-bold text-3xl text-center">
                🙌
                <br />
                함께 읽을 도서를 소개합니다.
              </div>

              <div className="flex flex-col items-center gap-5">
                <div className="font-bold text-2xl text-center">소프트웨어 아키텍처 101</div>

                <Image
                  alt="소프트웨어 아키텍처 101"
                  src="/images/binary-book-club/book-cover-01.webp"
                  width="300"
                  height="300"
                />

                <a
                  className="rounded-full border-blue-800  bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-8"
                  href="https://ridibooks.com/books/443000966"
                  target="_blank"
                  rel="noreferrer">
                  도서 정보
                </a>

                <div className="text-xl p-8">
                  &apos;소프트웨어 아키텍처 101&apos;는 아키텍처 사고 방식부터 다양한 아키텍처 스타일, 실무에 필요한
                  소프트 스킬까지 아우르는 종합 가이드를 제공합니다. 이 책은 기술적 심층 분석과 함께 현대 소프트웨어
                  아키텍처의 최신 트렌드와 원칙을 설명합니다. 독자들은 아키텍처의 기초부터 실질적인 적용 방법, 팀 관리
                  및 리더십 기술까지 광범위한 지식을 얻을 수 있습니다.
                </div>
              </div>

              <div className="flex flex-col items-center gap-5">
                <div className="font-bold text-2xl text-center">소프트웨어 아키텍처 The Hard Parts</div>

                <Image
                  alt="소프트웨어 아키텍처 The Hard Parts"
                  src="/images/binary-book-club/book-cover-02.webp"
                  width="300"
                  height="300"
                />

                <a
                  className="rounded-full border-blue-800  bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-8"
                  href="https://ridibooks.com/books/443001081"
                  target="_blank"
                  rel="noreferrer">
                  도서 정보
                </a>

                <div className="text-xl p-8">
                  &apos;소프트웨어 아키텍처 The Hard Parts&apos;는 분산 아키텍처 구축에 있어서 세분화와 통합의 관점에서
                  심도 있는 트레이드오프 분석과 의사결정 과정을 다룹니다. 실무 중심의 이 책은 아키텍처 모듈성, 분해,
                  재사용, 데이터 오너십, 분산 트랜잭션 관리와 같은 복잡한 주제를 실제 사례를 통해 구체적으로 설명합니다.
                  독자들은 이 책을 통해 실무에서 직면하는 아키텍처의 어려운 부분들을 깊이 이해하고, 실질적인 솔루션을
                  개발하는 데 필요한 지식을 얻을 수 있습니다.
                </div>
              </div>

              <div className="flex flex-col items-center gap-5">
                <div className="font-bold text-2xl text-center">엔터프라이즈 애플리케이션 아키텍처 패턴</div>

                <Image
                  alt="엔터프라이즈 애플리케이션 아키텍처 패턴"
                  src="/images/binary-book-club/book-cover-03.webp"
                  width="300"
                  height="300"
                />

                <a
                  className="rounded-full border-blue-800  bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-8"
                  href="https://ridibooks.com/books/1160000096"
                  target="_blank"
                  rel="noreferrer">
                  도서 정보
                </a>

                <div className="text-xl p-8">
                  &apos;엔터프라이즈 애플리케이션 아키텍처 패턴&apos;은 엔터프라이즈 애플리케이션 개발의 복잡한 문제를
                  해결하기 위한 40가지 패턴을 제공합니다. 이 책은 다중 계층 객체지향 플랫폼에서의 설계와 구현, 관계형
                  데이터베이스 매핑, 웹 프레젠테이션, 동시성 처리 등을 포괄적으로 다룹니다. 마틴 파울러와 공동 저자들은
                  실무 중심의 접근을 통해 엔터프라이즈 애플리케이션 개발에서 직면하는 일반적이지만 복잡한 문제들에 대한
                  실용적인 해결책을 제시합니다.
                </div>
              </div>
            </section>

            <section className="flex flex-col items-center gap-8">
              <div className="font-bold text-3xl text-center">자주 묻는 질문</div>
              <div className="text-xl text-center">📮 12월 31일에 메일로 자세한 내용을 전달해 드려요!</div>

              <div className="flex flex-col gap-4 py-12 w-full">
                <div className="font-bold text-2xl px-6">모임은 언제 하나요?</div>
                <div className="text-xl px-6">
                  👉 모임은 매주 일요일 저녁 20시에 온라인으로 진행되요. 모두가 편안한 환경에서 참여할 수 있도록,
                  원격으로 모여 서로의 의견과 생각을 나누게 되요.
                </div>
              </div>

              <div className="flex flex-col gap-4 py-12 w-full">
                <div className="font-bold text-2xl px-6">모임 방식은 어떻게 되나요?</div>
                <div className="text-xl px-6">
                  👉 매달 하나의 책을 4등분하여 매주 한 부분씩 읽어나가요. 이렇게 해서 매주 일요일 모임에서 해당 주에
                  읽은 부분에 대해 토론하고 서로의 생각을 공유해요.
                </div>
              </div>

              <div className="flex flex-col gap-4 py-12 w-full">
                <div className="font-bold text-2xl px-6">모임은 총 몇 번 진행되나요?</div>
                <div className="text-xl px-6">
                  👉 모임은 2024년 1월 7일에 시작하여, 총 12번 진행될 예정이에요. 설날에 쉬어요.
                </div>
              </div>

              <div className="font-bold text-xl text-center px-6">
                다른 문의 사항이 있으시면 언제든지 <br />
                <a className="border-b-2 border-fuchsia-500" href="mailto:alice@w0nder.land">
                  alice@w0nder.land
                </a>
                로 메일을 보내주세요!
              </div>
            </section>

            <section className="flex flex-col items-center gap-8 mb-64">
              <h1 className="font-bold text-3xl">새해, 새 시작: 함께 책으로 성장하기</h1>
              <div className="text-xl text-center">
                함께 읽고, 함께 배우며, 함께 성장해요.
                <br />세 권의 책으로 시작하는 우리의 2024년
              </div>
              <div>
                <input
                  type="email"
                  className="outline-none border-2 rounded-l-full border-blue-800 p-2 pl-6 w-60"
                  placeholder="이메일을 입력해 주세요."
                  value={email}
                  onChange={handleEmailChange}
                />
                <button
                  type="button"
                  className="border-r-2 border-t-2  border-b-2 rounded-r-full border-blue-800  bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4"
                  onClick={handleEmailSubmit}>
                  참여하기
                </button>
              </div>
            </section>
          </article>
        </div>
      </DefaultLayout>
    </>
  );
};

export default BinaryBookClubPage;
