import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';
import cheerio from 'cheerio';

export const config = {
  runtime: 'edge',
};

const getMetaData = (html: string) => {
  const $ = cheerio.load(html);

  const headTitle = $('head title').text();
  const metaDescription = $('meta[name="description"]').attr('content');

  const ogTitle = $('meta[property="og:title"]').attr('content');
  const ogDescription = $('meta[property="og:description"]').attr('content');

  const bodyText = $('body').text();
  const articleText = $('body article').text();

  return {
    title: ogTitle || headTitle,
    description: ogDescription || metaDescription || articleText || bodyText,
  };
};

const BorderColor = '#E500FF';
const FontColor = '#000000';
const BackgroundColor = '#FFFFFF';

const Fonts: { PretendardBold?: ArrayBuffer; PretendardRegular?: ArrayBuffer } = {};
const loadFonts = async () => {
  if (Object.keys(Fonts).length > 0) {
    return;
  }

  const [pretendardRegular, pretendardBold] = await Promise.all([
    fetch(new URL('../../../../assets/fonts/pretendard/pretendard-regular.subset.woff', import.meta.url)).then(res =>
      res.arrayBuffer(),
    ),
    fetch(new URL('../../../../assets/fonts/pretendard/pretendard-bold.subset.woff', import.meta.url)).then(res =>
      res.arrayBuffer(),
    ),
  ]);

  Fonts.PretendardRegular = pretendardRegular;
  Fonts.PretendardBold = pretendardBold;
};

export default async function handler(req: NextRequest) {
  await loadFonts();

  const url = String(req.nextUrl.searchParams.get('url') ?? '');
  if (!url) {
    return new Response(JSON.stringify({ message: `url is not exist - url - ${url}` }), { status: 404 });
  }

  const htmlRes = await fetch(new URL(url, import.meta.url));
  if (!htmlRes.ok) {
    return new Response(JSON.stringify({ message: `html data is not exist - url - ${url}` }), { status: 404 });
  }

  const html = await htmlRes.text();
  const { title, description } = getMetaData(html);

  return new ImageResponse(
    (
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          gap: 40,
          color: FontColor,
          backgroundColor: BackgroundColor,
          width: '100%',
          height: '100%',
          padding: 72,
        }}>
        <p
          style={{
            display: 'block',
            fontSize: 60,
            fontFamily: '"Pretendard"',
            fontWeight: 700,
            lineClamp: '1 "...   "',
          }}>
          {title}
        </p>
        <p
          style={{
            display: 'block',
            fontSize: 50,
            fontFamily: '"Pretendard"',
            fontWeight: 400,
            lineHeight: 1.4,
            lineClamp: '4 "...   "',
          }}>
          {description}
        </p>

        <div
          style={{
            position: 'absolute',
            left: 40,
            top: 40,
            right: 40,
            bottom: 40,
            border: `6px solid ${BorderColor}`,
            borderRadius: 50,
          }}
        />

        <div
          style={{
            position: 'absolute',
            right: 35,
            bottom: 25,
            paddingLeft: 40,
            fontSize: 60,
            fontFamily: '"Pretendard"',
            fontWeight: 700,
            backgroundColor: BackgroundColor,
          }}>
          w0nder.land
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Pretendard',
          data: Fonts.PretendardBold!,
          style: 'normal',
          weight: 700,
        },
        {
          name: 'Pretendard',
          data: Fonts.PretendardRegular!,
          style: 'normal',
          weight: 400,
        },
      ],
    },
  );
}
