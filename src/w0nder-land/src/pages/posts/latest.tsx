import { getAllPosts } from '@/repository/posts';
import { getPostUrl } from '@/libs/utils/urls';

const LatestPage = () => <div />;

export const getServerSideProps = async () => {
  const posts = getAllPosts();
  const post = posts[0];

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

export default LatestPage;
