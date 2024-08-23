import PostsPage from '@/pages/posts';
import { getAllPosts } from '@/repository/posts';
import { GetStaticProps } from 'next';

export default PostsPage;

export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPosts();

  return {
    props: { posts },
  };
};
