import { getCollection, type CollectionEntry } from 'astro:content';
import { PER_PAGE, SERIES_MAP } from './constants';
import type { Series } from './types';

export type PostEntry = CollectionEntry<'posts'>;

export async function getAllPosts(): Promise<PostEntry[]> {
  const posts = await getCollection('posts');
  return posts.sort(
    (a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime()
  );
}

export async function getAllCategories(): Promise<
  { name: string; slug: string; description?: string }[]
> {
  const posts = await getCollection('posts');
  const categoryMap = new Map<
    string,
    { name: string; slug: string }
  >();

  for (const post of posts) {
    if (!categoryMap.has(post.data.categorySlug)) {
      categoryMap.set(post.data.categorySlug, {
        name: post.data.category,
        slug: post.data.categorySlug,
      });
    }
  }

  return Array.from(categoryMap.values());
}

export async function getAllTags(): Promise<{ name: string; slug: string }[]> {
  const posts = await getCollection('posts');
  const tagSet = new Set<string>();

  for (const post of posts) {
    for (const tag of post.data.tags) {
      tagSet.add(tag);
    }
  }

  return Array.from(tagSet)
    .sort()
    .map((tag) => ({
      name: tag,
      slug: tag.toLowerCase().replace(/[\s.]+/g, '-'),
    }));
}

export async function getPostsByCategory(
  categorySlug: string
): Promise<PostEntry[]> {
  const posts = await getAllPosts();
  return posts.filter((p) => p.data.categorySlug === categorySlug);
}

export function paginatePosts(
  posts: PostEntry[],
  page: number,
  perPage: number = PER_PAGE
): { posts: PostEntry[]; totalPages: number } {
  const totalPages = Math.max(1, Math.ceil(posts.length / perPage));
  const start = (page - 1) * perPage;
  return {
    posts: posts.slice(start, start + perPage),
    totalPages,
  };
}

export async function getPostsByTag(tagSlug: string): Promise<PostEntry[]> {
  const posts = await getAllPosts();
  return posts.filter((p) =>
    p.data.tags.some(
      (t) => t.toLowerCase().replace(/[\s.]+/g, '-') === tagSlug
    )
  );
}

export function getAllSeries(): Series[] {
  return Object.values(SERIES_MAP);
}

export async function getPostsBySeries(seriesSlug: string): Promise<PostEntry[]> {
  const posts = await getCollection('posts');
  return posts
    .filter((p) => p.data.series === seriesSlug)
    .sort((a, b) => (a.data.seriesOrder ?? 0) - (b.data.seriesOrder ?? 0));
}

export async function getSeriesNavigation(post: PostEntry): Promise<{
  series: Series;
  posts: PostEntry[];
  currentIndex: number;
  prev: PostEntry | null;
  next: PostEntry | null;
} | null> {
  const seriesSlug = post.data.series;
  if (!seriesSlug) return null;

  const series = SERIES_MAP[seriesSlug];
  if (!series) return null;

  const posts = await getPostsBySeries(seriesSlug);
  const currentIndex = posts.findIndex((p) => p.id === post.id);
  if (currentIndex === -1) return null;

  return {
    series,
    posts,
    currentIndex,
    prev: currentIndex > 0 ? posts[currentIndex - 1] : null,
    next: currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null,
  };
}
