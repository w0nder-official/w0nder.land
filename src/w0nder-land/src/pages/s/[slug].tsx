import { GetServerSidePropsContext } from 'next';
import { getAllPosts } from '@/repository/posts';
import { getPostUrl } from '@/libs/utils/urls';

const ShortUrlPage = () => <div />;

export const getServerSideProps = async ({ query }: GetServerSidePropsContext) => {
  const slug = String(query.slug);
  const posts = getAllPosts();
  const post = posts.find(it => it.shortUrl === `/s/${slug}`);

  if (!post) {
    return {
      redirect: {
        destination: '/posts',
        permanent: false,
      },
      props: {},
    };
  }

  return {
    redirect: {
      destination: getPostUrl(post.uuid, post.title),
      permanent: false,
    },
    props: {},
  };
};

export default ShortUrlPage;
