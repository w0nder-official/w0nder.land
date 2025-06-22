import { Nav } from '@/components/common/Nav';
import { DefaultLayout } from '@/components/layouts/DefaultLayout';
import { Card } from '@/components/ui/card';
import { getAllPosts, Post } from '@/repository/posts';
import { DateTime } from 'luxon';
import { GetStaticProps } from 'next';
import Link from 'next/link';

function getReadTime(content: string) {
  const charsPerMinute = 400; // 한글 기준 1분에 400자
  const { length } = content.replace(/\s/g, ''); // 공백 제외 글자수
  const minutes = Math.max(1, Math.ceil(length / charsPerMinute));
  return `${minutes}분`;
}

type PostsProps = {
  posts: Post[];
};

const PostsPage = ({ posts }: PostsProps) => (
  <DefaultLayout>
    <Nav title="Posts" leftUrl="/" />

    <ul className="flex flex-col">
      {posts.map((post, idx) => (
        <Link href={post.url} key={post.uuid}>
          <li
            className={`p-5 flex flex-col gap-2 border-b-4 border-black ${idx % 2 === 0 ? 'bg-amber-50' : 'bg-white'}`}>
            <h3 className="text-3xl font-black text-black mr-2 line-clamp-2">{post.title}</h3>

            <ul className="flex flex-row gap-2">
              {post.tags?.map(tag => (
                <li key={tag} className="text-2xl bg-black text-white px-2 py-1 font-black">
                  {tag}
                </li>
              ))}
            </ul>

            <div className="flex items-center space-x-3 text-xl font-bold text-gray-700">
              <span>{getReadTime(post.article)}</span>
              <span>•</span>
              <span>{DateTime.fromISO(post.createdAt).toFormat('yyyy.MM.dd')}</span>
            </div>
          </li>
        </Link>
      ))}
    </ul>
  </DefaultLayout>
);

export default PostsPage;

export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPosts();

  return {
    props: { posts },
  };
};
