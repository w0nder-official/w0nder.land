import { GetServerSidePropsContext } from 'next';
import { getAllPosts } from '@/repository/posts';
import { getPostUrl } from '@/libs/utils/urls';
import { Configure } from '@/constants/configure';

const SitemapXmlPage = () => null;

export default SitemapXmlPage;

export const getServerSideProps = async ({ res }: GetServerSidePropsContext) => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${getAllPosts()
      .map(
        post => `
      <url>
        <loc>${Configure.ServiceUrl}${getPostUrl(post.uuid, post.title)}</loc>
        <lastmod>${post.createdAt}</lastmod>
        <changefreq>always</changefreq>
        <priority>1.0</priority>
      </url>
    `,
      )
      .join('')}
    </urlset>
  `;

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return { props: {} };
};
