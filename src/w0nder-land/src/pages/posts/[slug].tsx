import { HeadContentMeta } from '@/components/common/HeadContentMeta';
import { Nav } from '@/components/common/Nav';
import { Share } from '@/components/common/Share';
import { Editor } from '@/components/editor/Editor';
import { getTexts } from '@/components/editor/utils';
import { DefaultLayout } from '@/components/layouts/DefaultLayout';
import { Configure } from '@/constants/configure';
import { ShareIcon } from '@/icons/ShareIcon';
import { ellipsis } from '@/libs/utils/string';
import { getPostUrl } from '@/libs/utils/urls';
import { getAllPosts, Post } from '@/repository/posts';
import { DateTime } from 'luxon';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useCallback, useMemo, useState } from 'react';
import type { BlogPosting, WithContext } from 'schema-dts';

type PostProps = {
  post: Post;
};

const PostPage = ({ post }: PostProps) => {
  const [isShareOpen, setIsShareOpen] = useState(false);

  const postCreatedAt = useMemo(() => post && DateTime.fromISO(post.createdAt), [post]);

  // 80자 이상이 되면 검색엔진에서 잘 처리해주지 못한다 80자 이상이면 ellipsis 처리를 해준다.
  const text = useMemo(() => getTexts(post?.article ?? []), [post]);
  const title = useMemo(() => ellipsis(post?.title ?? '', 80), [post]);
  const description = useMemo(() => ellipsis(text.replaceAll('\n', ' ') ?? '', 200), [text]);

  const structuredData: WithContext<BlogPosting> | undefined = useMemo(
    () =>
      post
        ? {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: title,
            name: title,
            wordCount: text.length,
            keywords: ['developer', 'programming', 'w0nder', 'w0nder.land'],
            description,
            dateCreated: DateTime.fromISO(post.createdAt).startOf('second').toISO() ?? undefined,
            dateModified: DateTime.fromISO(post.updatedAt).startOf('second').toISO() ?? undefined,
          }
        : undefined,
    [description, post, text.length, title],
  );

  const handleShareOpen = useCallback(() => {
    setIsShareOpen(true);
  }, []);

  const handleShareClose = useCallback(() => {
    setIsShareOpen(false);
  }, []);

  if (!post) {
    return (
      <DefaultLayout>
        <Nav title="Posts" leftUrl="/posts" />

        <article className="flex flex-col gap-6 px-4">
          <header>
            <h1 className="font-medium text-3xl">글이 없어요.</h1>
          </header>
        </article>
      </DefaultLayout>
    );
  }

  return (
    <>
      <HeadContentMeta title={title} description={description} structuredData={structuredData} />
      <DefaultLayout>
        <Nav title="Posts" leftUrl="/posts" />

        <article className="flex flex-col gap-6 p-4">
          <header>
            <h1 className="font-medium text-3xl">{post.title}</h1>
            <div className="flex flex-row justify-between items-center my-4 text-base">
              <span className="flex-shrink-0 font-normal text-gray-500">{postCreatedAt?.toFormat('yyyy.MM.dd')}</span>
              <div className="flex flex-row gap-2 items-center">
                <button type="button" aria-label="share" onClick={handleShareOpen}>
                  <ShareIcon size={24} color="#000000" />
                </button>
              </div>
            </div>
          </header>
          <section>
            <Editor content={post.article} editable={false} />

            <div className="sr-only">{post.article}</div>
          </section>
        </article>

        <Share
          title={title}
          text={description}
          url={`${Configure.ServiceUrl}${post?.shortUrl ?? post?.url ?? ''}`}
          isOpen={isShareOpen}
          onClose={handleShareClose}
        />
      </DefaultLayout>
    </>
  );
};

export default PostPage;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = (params?.slug as string) ?? '';
  const [uuid, title] = slug.split('-');
  const posts = getAllPosts();

  // 레거시 대응
  if (uuid === '28626b62da0242528bfe5f6873bb32bb') {
    return {
      redirect: {
        destination: getPostUrl('1', title),
        permanent: false,
      },
    };
  }

  const post = posts.find(it => it.uuid === uuid);
  return {
    props: { post },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  // 여기서 모든 가능한 slug를 생성하거나 가져와야 합니다.
  // 예를 들어 데이터베이스에서 모든 포스트의 slug를 가져올 수 있습니다.
  // 이 코드는 실제 데이터 소스 및 프레임워크에 따라 다를 수 있습니다.
  const paths = getAllPosts().map(post => ({
    params: { slug: `${post.uuid}-${post.title}` },
  }));

  return {
    paths,
    fallback: false, // 이 부분은 fallback 설정에 따라 다를 수 있습니다.
  };
};
