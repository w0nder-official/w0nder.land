import matter from 'gray-matter';
import { join } from 'path';
import * as fs from 'fs';
import { getPostUrl } from '@/libs/utils/urls';

export enum PostType {
  Markdown = 'Markdown',
}

interface BasePost {
  uuid: string;
  shortUrl: string;
  title: string;
  author: string;
  authorProfile: string;
  keywords: string[];
  createdAt: string;
  updatedAt: string;
  url: string;
}

interface MarkdownPost extends BasePost {
  type: PostType.Markdown;
  article: string;
}

export type Post = MarkdownPost;

const postsDirectory = join(process.cwd(), 'public', 'posts');

export function getPostUuids() {
  return fs.readdirSync(postsDirectory).filter(uuid => {
    const fullPath = join(postsDirectory, uuid, 'post.md');
    return fs.existsSync(fullPath);
  });
}

export function getPostByUuid(uuid: string) {
  const fullPath = join(postsDirectory, uuid, 'post.md');
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    type: PostType.Markdown,
    uuid,
    author: data.author,
    authorProfile: data.authorProfile,
    title: data.title,
    keywords: data.keywords,
    article: content,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    url: getPostUrl(uuid, data.title),
    shortUrl: `/s/${data.shortUrl}`,
  } satisfies Post;
}

export function getAllPosts(): Post[] {
  const uuids = getPostUuids();

  return uuids.map(uuid => getPostByUuid(uuid)).sort((post1, post2) => (post1.createdAt > post2.createdAt ? -1 : 1));
}
