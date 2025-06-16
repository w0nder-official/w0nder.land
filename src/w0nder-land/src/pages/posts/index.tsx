import { useMemo } from 'react';
import { DateTime } from 'luxon';
import { getAllPosts, Post } from '@/repository/posts';
import { HeadContentMeta } from '@/components/common/HeadContentMeta';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { ellipsis } from '@/libs/utils/string';
import { DefaultLayout } from '@/components/layouts/DefaultLayout';
import { Configure } from '@/constants/configure';

type PostsProps = {
  posts: Post[];
};

const PostsPage = ({ posts }: PostsProps) => {
  // 80자 이상이 되면 검색엔진에서 잘 처리해주지 못한다 80자 이상이면 ellipsis 처리를 해준다.
  const description = useMemo(() => ellipsis(posts.map(post => post.title).join(', '), 80), [posts]);

  return (
    <>
      <HeadContentMeta title="글 목록" description={description} ogUrl={`${Configure.ServiceUrl}/images/og.png`} />

      <DefaultLayout>
        <ul className="p-2">
          {posts.map(post => (
            <Link key={post.uuid} href={post.url}>
              <li className="text-base py-4 border-b flex justify-between items-center gap-1.5 hover:border-b-fuchsia-500">
                <div className="flex flex-col gap-1 px-2">
                  <span className="flex-shrink-0 font-normal text-gray-400 text-sm">
                    {DateTime.fromISO(post.createdAt).toFormat('yyyy.MM.dd')}
                  </span>
                  <span className="block">{post.title}</span>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      </DefaultLayout>
    </>
  );
};

export default PostsPage;

export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPosts();

  return {
    props: { posts },
  };
};
