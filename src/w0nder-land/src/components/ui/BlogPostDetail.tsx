import { Editor } from '@/components/editor/Editor';
import { AdSense } from '@/components/common/AdSense';
import { AD_SLOTS, AdFormat, AdSlotType } from '@/constants/ads';
import { BrutalBadge } from '@/components/ui/BrutalBadge';
import { BlogPost } from '@/components/ui/types';

export function BlogPostDetail({ title, content, date, readTime, category, accentColor }: BlogPost) {
  return (
    <article className="max-w-5xl mx-auto">
      {/* Post Header */}
      <header className="mb-12">
        {/* Category Badge */}
        <div className="mb-6">
          <BrutalBadge accentColor={accentColor} shadowSize="md" borderSize="4" className="px-4 py-2">
            {category}
          </BrutalBadge>
        </div>
        {/* Title */}
        <h1 className="text-5xl font-black text-black mb-6 leading-tight">{title}</h1>
        {/* Meta Info */}
        <div className="flex gap-4 text-lg mb-8">
          <span className="font-black text-black">{date}</span>
          <span className="text-gray-600 font-black">•</span>
          <span className="font-black text-black">{readTime}</span>
        </div>
      </header>

      {/* Content using Editor component */}
      <div className="mb-16">
        {content && (
          <>
            {/* 콘텐츠 상단 광고 */}
            <div className="mb-8">
              <AdSense
                adSlot={AD_SLOTS[AdSlotType.INLINE]}
                adFormat={AdFormat.AUTO}
                fullWidthResponsive
                enableLazyLoad
                className="border-4 border-black bg-white p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              />
            </div>

            <Editor content={content} editable={false} />

            {/* 콘텐츠 중간 광고 */}
            <div className="my-8">
              <AdSense
                adSlot={AD_SLOTS[AdSlotType.RECTANGLE]}
                adFormat={AdFormat.RECTANGLE}
                fullWidthResponsive
                enableLazyLoad
                className="border-4 border-black bg-white p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              />
            </div>

            {/* 콘텐츠 하단 광고 */}
            <div className="mt-8">
              <AdSense
                adSlot={AD_SLOTS[AdSlotType.BANNER]}
                adFormat={AdFormat.AUTO}
                fullWidthResponsive
                enableLazyLoad
                className="border-4 border-black bg-white p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              />
            </div>
          </>
        )}
      </div>

      {/* SEO용 텍스트 - 시각적으로는 숨김 */}
      {content && (
        <div className="sr-only">
          <p>{content}</p>
        </div>
      )}

      {/* Newsletter Signup - 중간에 배치 */}
      {/* <section className="mb-16">
        <div className="border-4 border-black bg-yellow-400 p-8 shadow-[8px_8px_0px_0px_#000] max-w-2xl mx-auto">
          <h2 className="text-3xl font-black text-black mb-4 text-center">GET MORE BRUTAL TRUTHS</h2>
          <p className="text-black font-black mb-6 text-center text-lg">
            No fluff. No corporate speak. Just raw design insights delivered weekly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="YOUR EMAIL ADDRESS"
              className="flex-1 border-2 border-black px-4 py-2 font-black text-black placeholder:text-gray-600 text-lg"
            />
            <BrutalButton shadowSize="md" className="px-6 py-2 text-lg whitespace-nowrap">
              SUBSCRIBE
            </BrutalButton>
          </div>
        </div>
      </section> */}
    </article>
  );
}
